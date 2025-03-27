// components/ResumeAnalysisResult.tsx
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Download,
  FileText,
  Briefcase,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DetailedAnalysis } from "@/types";

type ResumeAnalysisResultProps = {
  result: DetailedAnalysis | null;
  onOptimize?: () => void;
};

const mockdata = {
  keywordMatch: [
    {
      context: "",
      found: false,
      keyword: "HTML5",
    },
    {
      context: "JavaScript, TypeScript, ReactJS, VueJS",
      found: true,
      keyword: "JavaScript frameworks",
    },
  ],
  atsCompatibility: 80,
  content: 70,
  format: 75,
  keywords: 60,
  overall: 60,
  improvements: [
    "Add a professional summary or objective statement",
    "Include more details about work experience and projects",
    "Use bullet points for better readability",
    "Ensure consistent formatting and spacing",
  ],
  strengths: [
    "Proficient in multiple programming languages and frameworks",
    "Clear contact information provided",
    "Relevant technical skills listed",
  ],
  summary:
    "The resume presents a good foundation with relevant skills, but lacks depth in experience and structure. Enhancing the content and format will improve its effectiveness.",
};

// 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-amber-500";
  return "text-red-500";
};

const getProgressColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
};

const ResumeAnalysisResult = ({
  result,
  onOptimize,
}: ResumeAnalysisResultProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scoresRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const improvementsRef = useRef<HTMLDivElement>(null);

  console.log("--result", result);

  const downloadReport = async () => {
    if (isDownloading || !result) return;

    setIsDownloading(true);

    try {
      console.log("Starting PDF generation process");

      // 使用组件中的result数据（或mockdata用于测试）
      const data = result;

      // 创建一个临时容器
      const container = document.createElement("div");
      container.style.width = "800px";
      container.style.padding = "30px";
      container.style.backgroundColor = "white";
      container.style.fontFamily =
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

      // 添加标题和日期
      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.justifyContent = "space-between";
      header.style.alignItems = "center";
      header.style.marginBottom = "20px";

      const title = document.createElement("h1");
      title.textContent = "Resume Analysis Report";
      title.style.fontSize = "24px";
      title.style.fontWeight = "bold";
      title.style.margin = "0";
      header.appendChild(title);

      const date = document.createElement("p");
      date.textContent = `Generated on: ${new Date().toLocaleDateString()}`;
      date.style.fontSize = "14px";
      date.style.color = "#666";
      date.style.margin = "0";
      header.appendChild(date);

      container.appendChild(header);

      // 添加分隔线
      const divider = document.createElement("div");
      divider.style.height = "1px";
      divider.style.backgroundColor = "#e5e7eb";
      divider.style.marginBottom = "25px";
      container.appendChild(divider);

      // 添加总分和摘要部分
      const overallSection = document.createElement("div");
      overallSection.style.display = "flex";
      overallSection.style.alignItems = "center";
      overallSection.style.marginBottom = "25px";

      const scoreContainer = document.createElement("div");
      scoreContainer.style.display = "flex";
      scoreContainer.style.alignItems = "center";
      scoreContainer.style.marginRight = "20px";

      const scoreValue = document.createElement("div");
      scoreValue.textContent = data.overall.toString();
      scoreValue.style.fontSize = "48px";
      scoreValue.style.fontWeight = "bold";
      scoreValue.style.color =
        data.overall >= 80
          ? "#10b981"
          : data.overall >= 60
          ? "#f59e0b"
          : "#ef4444";
      scoreContainer.appendChild(scoreValue);

      const scoreLabel = document.createElement("div");
      scoreLabel.textContent = "Overall Score";
      scoreLabel.style.fontSize = "14px";
      scoreLabel.style.color = "#6b7280";
      scoreLabel.style.marginLeft = "10px";
      scoreContainer.appendChild(scoreLabel);

      overallSection.appendChild(scoreContainer);

      const summary = document.createElement("p");
      summary.textContent = data.summary;
      summary.style.fontSize = "15px";
      summary.style.color = "#4b5563";
      summary.style.margin = "0";
      summary.style.flex = "1";

      overallSection.appendChild(summary);
      container.appendChild(overallSection);

      // 添加分数明细部分
      const scoresSection = document.createElement("div");
      scoresSection.style.marginBottom = "30px";

      const scoresTitle = document.createElement("h2");
      scoresTitle.textContent = "Score Breakdown";
      scoresTitle.style.fontSize = "20px";
      scoresTitle.style.fontWeight = "bold";
      scoresTitle.style.marginBottom = "15px";
      scoresSection.appendChild(scoresTitle);

      // 手动创建分数明细内容
      const metrics = [
        {
          name: "Content Quality",
          score: data.content,
          description: "Quality and relevance of your resume content",
        },
        {
          name: "Keyword Optimization",
          score: data.keywords,
          description: "How well your resume matches key job requirements",
        },
        {
          name: "Format & Structure",
          score: data.format,
          description: "Organization and readability of your resume",
        },
        {
          name: "ATS Compatibility",
          score: data.atsCompatibility,
          description:
            "How well your resume works with applicant tracking systems",
        },
      ];

      metrics.forEach((metric) => {
        const metricContainer = document.createElement("div");
        metricContainer.style.marginBottom = "15px";

        const metricHeader = document.createElement("div");
        metricHeader.style.display = "flex";
        metricHeader.style.justifyContent = "space-between";
        metricHeader.style.marginBottom = "5px";

        const metricInfo = document.createElement("div");

        const metricName = document.createElement("div");
        metricName.textContent = metric.name;
        metricName.style.fontSize = "15px";
        metricName.style.fontWeight = "500";
        metricInfo.appendChild(metricName);

        const metricDesc = document.createElement("div");
        metricDesc.textContent = metric.description;
        metricDesc.style.fontSize = "13px";
        metricDesc.style.marginBottom = "8px";
        metricDesc.style.color = "#6b7280";
        metricInfo.appendChild(metricDesc);

        metricHeader.appendChild(metricInfo);

        const metricScore = document.createElement("div");
        metricScore.textContent = `${metric.score}/100`;
        metricScore.style.fontSize = "15px";
        metricScore.style.fontWeight = "500";
        metricScore.style.color =
          metric.score >= 80
            ? "#10b981"
            : metric.score >= 60
            ? "#f59e0b"
            : "#ef4444";
        metricHeader.appendChild(metricScore);

        metricContainer.appendChild(metricHeader);

        // 进度条
        const progressContainer = document.createElement("div");
        progressContainer.style.height = "8px";
        progressContainer.style.backgroundColor = "#e5e7eb";
        progressContainer.style.borderRadius = "4px";
        progressContainer.style.overflow = "hidden";

        const progressBar = document.createElement("div");
        progressBar.style.height = "100%";
        progressBar.style.width = `${metric.score}%`;
        progressBar.style.backgroundColor =
          metric.score >= 80
            ? "#10b981"
            : metric.score >= 60
            ? "#f59e0b"
            : "#ef4444";

        progressContainer.appendChild(progressBar);
        metricContainer.appendChild(progressContainer);

        scoresSection.appendChild(metricContainer);
      });

      container.appendChild(scoresSection);

      // 添加关键词匹配部分（如果有）
      if (data.keywordMatch && data.keywordMatch.length > 0) {
        const keywordsSection = document.createElement("div");
        keywordsSection.style.marginBottom = "30px";

        const keywordsTitle = document.createElement("h2");
        keywordsTitle.textContent = "Keyword Matches";
        keywordsTitle.style.fontSize = "20px";
        keywordsTitle.style.fontWeight = "bold";
        keywordsTitle.style.marginBottom = "15px";
        keywordsSection.appendChild(keywordsTitle);

        // 创建表格
        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        // 表头
        const thead = document.createElement("thead");
        thead.style.backgroundColor = "#f3f4f6";

        const headerRow = document.createElement("tr");

        const headers = ["Keyword", "Found", "Context"];
        headers.forEach((headerText) => {
          const th = document.createElement("th");
          th.textContent = headerText;
          th.style.padding = "10px";
          th.style.textAlign = "left";
          th.style.fontSize = "14px";
          th.style.fontWeight = "500";
          headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 表体
        const tbody = document.createElement("tbody");

        data.keywordMatch.forEach((item, index) => {
          const row = document.createElement("tr");
          row.style.borderBottom = "1px solid #e5e7eb";

          // 关键词
          const keywordCell = document.createElement("td");
          keywordCell.textContent = item.keyword;
          keywordCell.style.padding = "10px";
          keywordCell.style.fontSize = "14px";
          keywordCell.style.fontWeight = "500";
          row.appendChild(keywordCell);

          // 是否找到
          const foundCell = document.createElement("td");
          foundCell.style.padding = "10px";

          const foundText = document.createElement("span");
          foundText.textContent = item.found ? "✓" : "✗";
          foundText.style.color = item.found ? "#10b981" : "#ef4444";
          foundText.style.fontWeight = "bold";
          foundCell.appendChild(foundText);

          row.appendChild(foundCell);

          // 上下文
          const contextCell = document.createElement("td");
          contextCell.textContent = item.found
            ? item.context
            : "Not found in resume";
          contextCell.style.padding = "10px";
          contextCell.style.fontSize = "13px";
          contextCell.style.color = "#6b7280";
          row.appendChild(contextCell);

          tbody.appendChild(row);
        });

        table.appendChild(tbody);
        keywordsSection.appendChild(table);

        container.appendChild(keywordsSection);
      }

      // 添加优势部分
      const strengthsSection = document.createElement("div");
      strengthsSection.style.marginBottom = "30px";

      const strengthsTitle = document.createElement("h2");
      strengthsTitle.textContent = "Your Resume Strengths";
      strengthsTitle.style.fontSize = "20px";
      strengthsTitle.style.fontWeight = "bold";
      strengthsTitle.style.marginBottom = "15px";
      strengthsSection.appendChild(strengthsTitle);

      const strengthsBox = document.createElement("div");
      strengthsBox.style.padding = "15px";
      strengthsBox.style.backgroundColor = "#f0fdf4";
      strengthsBox.style.border = "1px solid #bbf7d0";
      strengthsBox.style.borderRadius = "8px";
      strengthsBox.style.marginBottom = "15px";

      const strengthsIntro = document.createElement("p");
      strengthsIntro.textContent =
        "Here are the areas where your resume performs well:";
      strengthsIntro.style.margin = "0";
      strengthsIntro.style.lineHeight = "30px";
      strengthsIntro.style.fontSize = "14px";
      strengthsIntro.style.color = "#4b5563";

      strengthsBox.appendChild(strengthsIntro);
      strengthsSection.appendChild(strengthsBox);

      // 优势列表
      data.strengths.forEach((strength, index) => {
        const strengthItem = document.createElement("div");
        strengthItem.style.display = "flex";
        strengthItem.style.alignItems = "flex-start";
        strengthItem.style.padding = "12px";
        strengthItem.style.marginBottom = "10px";
        strengthItem.style.border = "1px solid #e5e7eb";
        strengthItem.style.borderRadius = "8px";

        const checkIcon = document.createElement("div");
        checkIcon.textContent = "✓";
        checkIcon.style.color = "#10b981";
        checkIcon.style.fontWeight = "bold";
        checkIcon.style.marginRight = "10px";
        // checkIcon.style.marginTop = "2px";
        strengthItem.appendChild(checkIcon);

        const strengthText = document.createElement("p");
        strengthText.textContent = strength;
        strengthText.style.margin = "0";
        strengthText.style.fontSize = "14px";
        strengthItem.appendChild(strengthText);

        strengthsSection.appendChild(strengthItem);
      });

      container.appendChild(strengthsSection);

      // 添加改进部分
      const improvementsSection = document.createElement("div");

      const improvementsTitle = document.createElement("h2");
      improvementsTitle.textContent = "Areas for Improvement";
      improvementsTitle.style.fontSize = "20px";
      improvementsTitle.style.fontWeight = "bold";
      improvementsTitle.style.marginBottom = "15px";
      improvementsSection.appendChild(improvementsTitle);

      const improvementsBox = document.createElement("div");
      improvementsBox.style.padding = "15px";
      improvementsBox.style.backgroundColor = "#fffbeb";
      improvementsBox.style.border = "1px solid #fde68a";
      improvementsBox.style.borderRadius = "8px";
      improvementsBox.style.marginBottom = "15px";

      const improvementsIntro = document.createElement("p");
      improvementsIntro.textContent =
        "Consider these suggestions to enhance your resume:";
      improvementsIntro.style.margin = "0";
      improvementsIntro.style.fontSize = "14px";
      improvementsIntro.style.color = "#4b5563";

      improvementsBox.appendChild(improvementsIntro);
      improvementsSection.appendChild(improvementsBox);

      // 改进列表
      data.improvements.forEach((improvement, index) => {
        const improvementItem = document.createElement("div");
        improvementItem.style.display = "flex";
        improvementItem.style.alignItems = "flex-start";
        improvementItem.style.padding = "12px";
        improvementItem.style.marginBottom = "10px";
        improvementItem.style.border = "1px solid #e5e7eb";
        improvementItem.style.borderRadius = "8px";

        const arrowIcon = document.createElement("div");
        arrowIcon.textContent = "→";
        arrowIcon.style.color = "#f59e0b";
        arrowIcon.style.fontWeight = "bold";
        arrowIcon.style.marginRight = "10px";
        // arrowIcon.style.marginTop = "2px";
        improvementItem.appendChild(arrowIcon);

        const improvementText = document.createElement("p");
        improvementText.textContent = improvement;
        improvementText.style.margin = "0";
        improvementText.style.fontSize = "14px";
        improvementItem.appendChild(improvementText);

        improvementsSection.appendChild(improvementItem);
      });

      container.appendChild(improvementsSection);

      // 添加页脚
      const footer = document.createElement("div");
      footer.style.borderTop = "1px solid #e5e7eb";
      footer.style.paddingTop = "15px";
      footer.style.textAlign = "center";
      footer.style.fontSize = "12px";
      footer.style.color = "#9ca3af";
      footer.textContent =
        "This report was generated automatically based on your resume analysis.";
      container.appendChild(footer);

      // 将容器添加到文档中但不可见
      document.body.appendChild(container);
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";

      console.log("Container prepared, generating canvas...");

      // 使用html2canvas捕获内容
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
      });

      console.log("Canvas generated, creating PDF...");

      // 创建PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // 计算尺寸
      const imgWidth = 210; // A4宽度(mm)
      const pageHeight = 295; // A4高度(mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 添加图像到PDF
      let heightLeft = imgHeight;
      let position = 0;

      // 第一页
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 如果内容超过一页，添加更多页面
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      console.log("PDF created, saving...");

      // 保存PDF
      pdf.save("Resume_Analysis_Report.pdf");

      // 清理
      document.body.removeChild(container);

      console.log("PDF saved successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full">
        <div ref={contentRef}>
          <Card className="border-primary/10 shadow-lg">
            <CardContent className="p-6">
              {/* 卡片头部 - 与其他组件保持一致性 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Resume Analysis</h3>
                </div>

                <div className="flex items-center space-x-2">
                  <div
                    className={`text-3xl font-bold ${getScoreColor(
                      result?.overall
                    )}`}>
                    {result?.overall}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Overall
                    <br />
                    Score
                  </div>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-sm text-muted-foreground mb-6">
                {result?.summary}
              </motion.p>

              <Tabs defaultValue="scores" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg">
                  <TabsTrigger
                    value="scores"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    Score Breakdown
                  </TabsTrigger>
                  <TabsTrigger
                    value="strengths"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    Strengths
                  </TabsTrigger>
                  <TabsTrigger
                    value="improvements"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    Improvements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="scores" className="space-y-6">
                  {/* 分数明细 */}
                  <div className="space-y-4" ref={scoresRef}>
                    {[
                      {
                        name: "Content Quality",
                        score: result?.content,
                        description:
                          "Quality and relevance of your resume content",
                      },
                      {
                        name: "Keyword Optimization",
                        score: result?.keywords,
                        description:
                          "How well your resume matches key job requirements",
                      },
                      {
                        name: "Format & Structure",
                        score: result?.format,
                        description:
                          "Organization and readability of your resume",
                      },
                      {
                        name: "ATS Compatibility",
                        score: result?.atsCompatibility,
                        description:
                          "How well your resume works with applicant tracking systems",
                      },
                    ].map((metric) => (
                      <div key={metric.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-foreground">
                              {metric.name}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {metric.description}
                            </p>
                          </div>
                          <span
                            className={`text-sm font-medium ${getScoreColor(
                              metric.score
                            )}`}>
                            {metric.score}/100
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className={`h-full ${getProgressColor(
                              metric.score
                            )}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.score}%` }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 关键词匹配 */}
                  {result?.keywordMatch && result?.keywordMatch.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <h4 className="mb-3 font-medium text-foreground">
                          Keyword Matches
                        </h4>
                        <div className="max-h-60 overflow-y-auto rounded-lg border border-border">
                          <table className="w-full">
                            <thead className="bg-muted/50 text-left">
                              <tr>
                                <th className="p-2 text-sm font-medium">
                                  Keyword
                                </th>
                                <th className="p-2 text-sm font-medium">
                                  Found
                                </th>
                                <th className="p-2 text-sm font-medium">
                                  Context
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {result?.keywordMatch.map((item, index) => (
                                <tr key={index}>
                                  <td className="p-2 text-sm font-medium">
                                    {item.keyword}
                                  </td>
                                  <td className="p-2">
                                    {item.found ? (
                                      <span className="flex items-center text-green-500">
                                        <CheckCircle className="mr-1 h-4 w-4" />
                                      </span>
                                    ) : (
                                      <span className="flex items-center text-red-500">
                                        <XCircle className="mr-1 h-4 w-4" />
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-2 text-xs text-muted-foreground">
                                    {item.found
                                      ? item.context
                                      : "Not found in resume"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="strengths" className="space-y-4">
                  <div
                    ref={strengthsRef}
                    className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          Your Resume Strengths
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Here are the areas where your resume performs well:
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {result?.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-border p-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                          <p className="text-sm">{strength}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="improvements" className="space-y-4">
                  <div
                    ref={improvementsRef}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          Areas for Improvement
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Consider these suggestions to enhance your resume:
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {result?.improvements.map((improvement, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-border p-3">
                        <div className="flex items-start space-x-3">
                          <ArrowRight className="mt-0.5 h-5 w-5 text-amber-500" />
                          <p className="text-sm">{improvement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* 操作按钮 */}
              <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={onOptimize}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Optimize Resume
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isDownloading}
                  onClick={downloadReport}>
                  {isDownloading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeAnalysisResult;
