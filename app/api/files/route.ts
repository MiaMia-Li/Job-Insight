// app/api/file/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

interface FileUploadData {
  originalName: string;
  path: string;
  mimetype: string;
  size: number;
  extension?: string;
  isPublic?: boolean;
  description?: string;
  tags?: string;
}

export async function POST(req: NextRequest) {
  try {
    // 获取当前登录用户
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("--session", session);

    const userId = session.user.id as string;

    // 解析请求体
    const data: FileUploadData = await req.json();

    // 验证必要的字段
    const {
      originalName,
      path,
      mimetype,
      size,
      extension,
      isPublic = false,
      description = null,
      tags = null,
    } = data;

    if (!originalName || !path || !mimetype || size === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const filename = `${originalName.split(".")[0]}_${timestamp}${
      extension ? `.${extension}` : ""
    }`;

    // 将文件信息保存到数据库
    const fileData = await prisma.file.create({
      data: {
        filename,
        originalName,
        path,
        mimetype,
        size,
        extension: extension || null,
        isPublic,
        userId,
        description: description || null,
        tags: tags || null,
      },
    });

    return NextResponse.json({
      success: true,
      file: fileData,
    });
  } catch (error) {
    console.error("Failed upload:", error);
    return NextResponse.json({ error: "Failed upload" }, { status: 500 });
  }
}

interface PaginationQuery {
  limit?: string;
  offset?: string;
  isPublic?: string;
}

export async function GET(req: NextRequest) {
  try {
    // 获取当前登录用户
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id as string;

    // 获取查询参数
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const isPublic = searchParams.get("isPublic") === "true";

    // 构建查询条件
    const where: any = { userId };
    if (searchParams.has("isPublic")) {
      where.isPublic = isPublic;
    }

    // 查询文件
    const files = await prisma.file.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
      take: limit,
      skip: offset,
    });

    // 获取总数
    const total = await prisma.file.count({ where });

    return NextResponse.json({
      files,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + files.length < total,
      },
    });
  } catch (error) {
    console.error("Failed get file list:", error);
    return NextResponse.json(
      { error: "Failed get file list" },
      { status: 500 }
    );
  }
}
