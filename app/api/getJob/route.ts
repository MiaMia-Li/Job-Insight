// /app/api/getJobs/route.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const linkedIn = require("linkedin-jobs-api");

export async function GET(req: NextRequest) {
  // 解析请求中的查询参数
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "software engineer";
  const location = searchParams.get("location") || "India";
  const dateSincePosted = searchParams.get("dateSincePosted") || "past Week";
  const jobType = searchParams.get("jobType") || "full time";
  const remoteFilter = searchParams.get("remoteFilter") || "remote";
  const salary = searchParams.get("salary") || "100000";
  const experienceLevel = searchParams.get("experienceLevel") || "entry level";
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "0";

  // 设置查询参数
  const queryOptions = {
    keyword,
    location,
    dateSincePosted,
    jobType,
    remoteFilter,
    salary,
    experienceLevel,
    limit,
    page,
  };

  try {
    // 调用 LinkedIn API 获取职位信息
    const jobResults = await linkedIn.jobs(queryOptions);

    // 返回 JSON 格式的响应
    return NextResponse.json({ success: true, data: jobResults });
  } catch (error) {
    console.error("Error fetching LinkedIn jobs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error fetching jobs",
      },
      { status: 500 }
    );
  }
}
