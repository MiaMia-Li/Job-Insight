// lib/actions/resume-analysis.ts
"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ResumeAnalysisInput = {
  fileName: string;
  fileId?: string;
  analysisType: string;
  result: any; // 完整的分析结果
  jobTitle?: string;
  company?: string;
  location?: string;
  description?: string;
};

export async function saveResumeAnalysis(data: ResumeAnalysisInput) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // 创建分析记录
    const analysis = await prisma.resumeAnalysis.create({
      data: {
        fileName: data.fileName,
        fileId: data.fileId,
        analysisType: "basic",
        result: data.result, // 直接存储完整的分析结果
        jobTitle: data.jobTitle,
        company: data.company,
        location: data.location,
        description: data.description,
        user: {
          connect: {
            id: userId,
          },
        },
        // 移除了 userId 字段，因为已经通过 user.connect 设置了关系
      },
    });

    revalidatePath("/resume");
    return { success: true, analysisId: analysis.id };
  } catch (error) {
    console.error("Error saving resume analysis:", error);
    return { success: false, error: (error as Error).message };
  }
}
