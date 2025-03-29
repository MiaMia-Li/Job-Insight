// app/api/resume/score/route.ts
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getFileContent } from "@/lib/parase";
import { saveResumeAnalysis } from "@/actions/resume-analysis";

// Define suggestion example schema
const exampleSchema = z.object({
  before: z.string(),
  after: z.string(),
});

// Define keyword schema
const keywordSchema = z.object({
  text: z.string(),
  found: z.boolean(),
  count: z.number(),
});

// Define suggestion item schemas
const contentSuggestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  example: exampleSchema,
});

const keywordSuggestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(keywordSchema).optional(),
  example: exampleSchema, // 必须包含 before 和 after
});

const formatSuggestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  example: exampleSchema,
});

const customSuggestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  example: exampleSchema,
});

// 修改这里：将 suggestionsSchema 改为对象结构，而不是数组
const suggestionsSchema = z.object({
  content: z.array(contentSuggestionSchema),
  keywords: z.array(keywordSuggestionSchema),
  format: z.array(formatSuggestionSchema),
  custom: z.array(customSuggestionSchema),
});

const suggestionsSchemaBasic = z.object({
  content: z.array(contentSuggestionSchema),
  // keywords: z.array(keywordSuggestionSchema),
  format: z.array(formatSuggestionSchema),
  custom: z.array(customSuggestionSchema),
});
// 定义关键词匹配 schema
const keywordMatchSchema = z.object({
  keyword: z.string(),
  found: z.boolean(),
  context: z.string(),
});

// 定义基本分析结果的schema
const basicAnalysisSchema = z.object({
  overall: z.number(),
  content: z.number(),
  keywords: z.number(),
  format: z.number(),
  atsCompatibility: z.number(),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  summary: z.string(),
  suggestions: suggestionsSchemaBasic,
  //keywordMatch: z.array(keywordMatchSchema), // 添加到基本 schema 中
});

const detailedAnalysisSchema = basicAnalysisSchema.extend({
  keywordMatch: z.array(keywordMatchSchema),
  suggestions: suggestionsSchema,
});

// 不再需要单独的 detailedAnalysisSchema，因为基本 schema 已经包含了所有字段

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse the multipart form data
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
    const fileId = formData.get("fileId") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const analysisType = formData.get("analysisType") as string;

    console.log("--resumeFile", resumeFile);

    if (!resumeFile) {
      return NextResponse.json(
        { message: "Resume file is required" },
        { status: 400 }
      );
    }

    const content = await getFileContent(resumeFile);
    let resumeText = content.markdown;

    // 检查解析后的文本是否为空或过短
    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        {
          message:
            "Could not extract meaningful text from the resume. The file might be scanned or contain non-extractable text.",
        },
        { status: 400 }
      );
    }

    console.log(
      "--resumeText (first 200 chars):",
      resumeText.substring(0, 200)
    );

    // 准备提示信息
    let prompt = "";
    let schema;

    if (analysisType === "basic" || !description) {
      // 基本分析（无职位描述）
      prompt = `
        You are an expert resume analyzer. Please analyze the following resume and provide a comprehensive evaluation.
        
        Resume:
        ${resumeText}
        
        Analyze the resume for its overall quality, content, format, and ATS compatibility. 
        Provide scores on a scale of 0-100 for each category and an overall score.
        Also provide specific strengths and improvement suggestions.
        
        Additionally, generate specific optimization suggestions in the following categories:
        
        1. Content: Suggest improvements to the resume content, including professional summary, achievements, and descriptions.
        2. Keywords: Suggest industry-specific keywords to add, with information on which ones are already present.
        3. Format: Suggest improvements to the resume format, including section headings, bullet points, and date formats.
        4. Custom: Any other custom suggestions that would improve the resume.
        
        For each suggestion, provide a title, description, and before/after examples where applicable.
        For keyword suggestions, include an array of relevant keywords with information on whether they're found in the resume and how many times.
        
        IMPORTANT: The suggestions should be structured as an object with four properties: content, keywords, format, and custom. Each property should be an array of suggestion objects.
        
        CRITICAL: Every suggestion object MUST include an example object with both 'before' and 'after' fields, even for keyword suggestions. If there's no specific before/after example for keywords, use empty strings or placeholder text.
        
        Also include a keywordMatch array with important industry keywords, whether they were found in the resume, and context if found. For a basic analysis without a job description, use general industry keywords relevant to the resume.
      `;
      schema = basicAnalysisSchema;
    } else {
      // 详细分析（有职位描述匹配）
      prompt = `
        You are an expert resume analyzer. Please analyze the following resume against the provided job description.
        
        Resume:
        ${resumeText}
        
        Job Title: ${jobTitle || "Not specified"}
        Company: ${company || "Not specified"}
        Location: ${location || "Not specified"}
        Job Description:
        ${description}
        
        Analyze how well the resume matches the job requirements. Provide scores on a scale of 0-100 for:
        1. Overall match
        2. Content relevance
        3. Keywords alignment
        4. Format and presentation
        5. ATS compatibility
        
        Also provide specific strengths and improvement suggestions to better match this job.
        Include a keywordMatch array with important keywords from the job description, whether they were found in the resume, and context if found.
        
        Additionally, generate specific optimization suggestions in the following categories:
        
        1. Content: Suggest improvements to the resume content to better match the job description, including professional summary, achievements, and descriptions.
        2. Keywords: Suggest job-specific keywords to add from the job description, with information on which ones are already present.
        3. Format: Suggest improvements to the resume format, including section headings, bullet points, and date formats.
        4. Custom: Any other custom suggestions that would improve the resume's match to this specific job.
        
        For each suggestion, provide a title, description, and before/after examples where applicable.
        For keyword suggestions, include an array of relevant keywords with information on whether they're found in the resume and how many times.
        
        Make sure the suggestions are tailored to help the candidate better match this specific job opportunity.
        
        IMPORTANT: The suggestions should be structured as an object with four properties: content, keywords, format, and custom. Each property should be an array of suggestion objects.
        
        CRITICAL: Every suggestion object MUST include an example object with both 'before' and 'after' fields, even for keyword suggestions. If there's no specific before/after example for keywords, use empty strings or placeholder text like "No specific example" or provide a generic example of how to incorporate the keywords.
        
        CRITICAL: You MUST include a keywordMatch array with important keywords from the job description, whether they were found in the resume, and context if found.
      `;
      schema = detailedAnalysisSchema;
    }

    // 使用generateObject生成符合schema的分析结果
    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: schema, // 使用统一的 schema
      prompt: prompt,
      temperature: 0.3,
    });

    console.log("--result", result.object);

    // 保存分析结果到数据库
    const saveResult = await saveResumeAnalysis({
      fileName: resumeFile.name,
      fileId: fileId || undefined,
      analysisType: analysisType,
      result: result.object, // 直接存储完整的分析结果
      jobTitle: jobTitle || undefined,
      company: company || undefined,
      location: location || undefined,
      description: description || undefined,
    });

    // 返回分析结果和保存状态
    return NextResponse.json({
      ...result.object,
      saved: saveResult.success,
      analysisId: saveResult.analysisId,
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { message: "Failed to analyze resume", error: (error as Error).message },
      { status: 500 }
    );
  }
}
