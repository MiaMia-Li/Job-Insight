import { NextRequest } from "next/server";

export const runtime = "edge";

// Worker URL 和认证密钥
const WORKER_URL = "https://storysnap.support-0bf.workers.dev"; // 替换为您的 Worker URL
const AUTH_KEY_SECRET = process.env.AUTH_KEY_SECRET; // 需要在环境变量中设置
console.log("--AUTH_KEY_SECRET", AUTH_KEY_SECRET);

function generateSafeFileName(originalName: string): string {
  const timestamp = Date.now();
  const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${timestamp}-${cleanName}`;
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof Blob)) {
    return Response.json(
      { status: "error", message: "Valid file is required" },
      { status: 400 }
    );
  }

  const safeFileName = generateSafeFileName(file.name);

  try {
    // 创建请求头，添加认证密钥
    const headers = new Headers({
      "X-CF-Secret": AUTH_KEY_SECRET ?? "",
    });

    // 发送请求到 Worker
    const workerResponse = await fetch(
      `${WORKER_URL}/template/${safeFileName}`,
      {
        method: "PUT",
        headers: headers,
        body: file,
      }
    );

    if (!workerResponse.ok) {
      throw new Error(`Upload failed: ${workerResponse.statusText}`);
    }

    // 构建返回的 URL
    const publicUrl = `${WORKER_URL}/template/${safeFileName}`;

    return Response.json([
      {
        key: file.name,
        url: publicUrl,
        type: file.type,
      },
    ]);
  } catch (err) {
    console.error(err);
    return Response.json(
      { status: "error", message: "Upload failed" },
      { status: 500 }
    );
  }
}
