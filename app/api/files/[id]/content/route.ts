// app/api/files/[id]/content/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    // 从数据库获取文件信息
    const fileInfo = await prisma.file.findUnique({
      where: { id: String(id) },
    });

    if (!fileInfo) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    // 检查文件路径是否存在
    if (!fileInfo.path) {
      return NextResponse.json(
        { message: "File path not found" },
        { status: 404 }
      );
    }

    // 从云存储获取文件
    const fileUrl = fileInfo.path;

    try {
      // 使用fetch从云存储获取文件
      const cloudResponse = await fetch(fileUrl);

      if (!cloudResponse.ok) {
        console.error(
          `Failed to fetch file from cloud: ${cloudResponse.status} ${cloudResponse.statusText}`
        );
        return NextResponse.json(
          {
            message: `Failed to fetch file from cloud storage: ${cloudResponse.statusText}`,
          },
          { status: cloudResponse.status }
        );
      }

      // 获取文件内容
      const fileArrayBuffer = await cloudResponse.arrayBuffer();

      // 创建响应
      const response = new NextResponse(fileArrayBuffer);

      // 从原始响应获取Content-Type或使用数据库中的mimetype
      const contentType =
        cloudResponse.headers.get("Content-Type") ||
        fileInfo.mimetype ||
        "application/octet-stream";

      // 设置适当的头信息
      response.headers.set("Content-Type", contentType);
      response.headers.set(
        "Content-Disposition",
        `inline; filename="${fileInfo.originalName}"`
      );

      // 添加缓存控制（可选）
      response.headers.set("Cache-Control", "public, max-age=3600"); // 缓存1小时

      return response;
    } catch (fetchError) {
      console.error("Error fetching from cloud storage:", fetchError);
      return NextResponse.json(
        { message: "Error retrieving file from cloud storage" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing file request:", error);
    return NextResponse.json(
      { message: "Error processing file request" },
      { status: 500 }
    );
  }
}
