// app/api/resume/score/route.ts
import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
//@ts-ignore
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  //   if (!session.user.credits || session.user.credits <= 0) {
  //     return NextResponse.json({ message: "No credits left" }, { status: 400 });
  //   }

  try {
    // Parse the multipart form data
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
    const jobTitle = formData.get("jobTitle") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const analysisType = formData.get("analysisType") as string;

    if (!resumeFile) {
      return NextResponse.json(
        { message: "Resume file is required" },
        { status: 400 }
      );
    }

    // 获取文件类型
    const fileType = resumeFile.type;
    let resumeText = "";

    // 根据文件类型选择不同的解析方法
    if (fileType === "application/pdf") {
      // 处理PDF文件
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      try {
        const pdfData = await pdfParse(buffer);
        resumeText = pdfData.text;
      } catch (pdfError) {
        console.error("Error parsing PDF:", pdfError);
        return NextResponse.json(
          {
            message:
              "Unable to parse PDF file. Please ensure it's not password protected and contains extractable text.",
          },
          { status: 400 }
        );
      }
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // 处理Word文档
      const arrayBuffer = await resumeFile.arrayBuffer();
      try {
        const result = await mammoth.extractRawText({ arrayBuffer });
        resumeText = result.value;
      } catch (docError) {
        console.error("Error parsing Word document:", docError);
        return NextResponse.json(
          { message: "Unable to parse Word document." },
          { status: 400 }
        );
      }
    } else if (fileType === "text/plain") {
      // 处理纯文本文件
      resumeText = await resumeFile.text();
    } else {
      return NextResponse.json(
        {
          message: `Unsupported file type: ${fileType}. Please upload a PDF or text file.`,
        },
        { status: 400 }
      );
    }

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

    // Prepare the prompt based on whether job description is provided
    let prompt = "";
    if (analysisType === "basic" || !description) {
      // Basic analysis without job description
      prompt = `
        You are an expert resume analyzer. Please analyze the following resume and provide a comprehensive evaluation.
        
        Resume:
        ${resumeText}
        
        Analyze the resume for its overall quality, content, format, and ATS compatibility. 
        Provide scores on a scale of 0-100 for each category and an overall score.
        Also provide specific strengths and improvement suggestions.
      `;
    } else {
      // Detailed analysis with job description matching
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
      `;
    }

    // Create a new StreamData object with the schema matching what the frontend expects
    const result = await streamObject({
      model: openai("gpt-4o-mini"),
      system: "You are an expert resume analyzer providing detailed feedback.",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      schema: z.object({
        overall: z.number().describe("Overall resume score (0-100)"),
        content: z.number().describe("Content quality score (0-100)"),
        keywords: z.number().describe("Keywords relevance score (0-100)"),
        format: z.number().describe("Format and presentation score (0-100)"),
        atsCompatibility: z
          .number()
          .describe("ATS compatibility score (0-100)"),
        strengths: z.array(z.string()).describe("List of resume strengths"),
        improvements: z
          .array(z.string())
          .describe("List of improvement suggestions"),
        keywordMatch: z
          .array(
            z.object({
              keyword: z.string().describe("Job requirement keyword"),
              found: z
                .boolean()
                .describe("Whether the keyword was found in the resume"),
              context: z
                .string()
                .optional()
                .describe("Context where the keyword appears in the resume"),
            })
          )
          .optional()
          .describe("Keyword matching analysis"),
        summary: z.string().describe("Summary of the resume analysis"),
      }),
      temperature: 0.3,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { message: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
