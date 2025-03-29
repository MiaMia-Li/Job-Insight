// app/api/resume/analysis/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户身份
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const analysisId = params.id;

    if (!analysisId) {
      return NextResponse.json(
        { message: "Analysis ID is required" },
        { status: 400 }
      );
    }

    // 查询简历分析记录，确保只能访问自己的分析
    const analysis = await prisma.resumeAnalysis.findUnique({
      where: {
        id: analysisId,
        user: {
          id: userId,
        },
      },
      // include: {
      //   file: {
      //     select: {
      //       id: true,
      //       filename: true, // 使用正确的字段名 filename 而不是 name
      //       url: true,
      //       createdAt: true,
      //       originalName: true,
      //       mimetype: true,
      //       size: true,
      //     },
      //   },
      // },
    });

    if (!analysis) {
      return NextResponse.json(
        { message: "Resume analysis not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error fetching resume analysis:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch resume analysis",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
