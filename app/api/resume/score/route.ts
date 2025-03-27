// app/api/resume/score/route.ts
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getFileContent } from "@/lib/parase";

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
});

// 定义详细分析结果的schema（包含关键词匹配）
const detailedAnalysisSchema = basicAnalysisSchema.extend({
  keywordMatch: z.array(
    z.object({
      keyword: z.string(),
      found: z.boolean(),
      context: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse the multipart form data
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
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
      `;
      schema = detailedAnalysisSchema;
    }

    // 使用generateObject生成符合schema的分析结果
    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: schema,
      prompt: prompt,
      temperature: 0.3,
    });

    console.log("--result", result.object);

    // 返回分析结果
    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { message: "Failed to analyze resume", error: (error as Error).message },
      { status: 500 }
    );
  }
}
