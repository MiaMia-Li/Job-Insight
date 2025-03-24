"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  File,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function ResumeUploadPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [resumeScore, setResumeScore] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection via input
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Process the uploaded file
  const handleFileUpload = (file) => {
    // Check file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid resume file (PDF, DOC, DOCX, or TXT)");
      return;
    }

    setFile(file);
    simulateUploadAndProcessing();
  };

  // Simulate the upload and processing
  const simulateUploadAndProcessing = () => {
    // Reset states
    setUploadProgress(0);
    setProcessingStage("uploading");
    setAnalysisComplete(false);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setProcessingStage("analyzing");
          simulateAnalysis();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Simulate the analysis process
  const simulateAnalysis = () => {
    setTimeout(() => {
      setProcessingStage("scoring");
      setTimeout(() => {
        setAnalysisComplete(true);
        setResumeScore({
          overall: 68,
          content: 72,
          keywords: 58,
          format: 75,
          atsCompatibility: 65,
        });
      }, 2000);
    }, 3000);
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setProcessingStage(null);
    setAnalysisComplete(false);
    setResumeScore(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf"))
      return <File className="h-10 w-10 text-red-500" />;
    if (fileType.includes("word") || fileType.includes("doc"))
      return <File className="h-10 w-10 text-blue-500" />;
    return <File className="h-10 w-10 text-muted-foreground" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Upload Your Resume
          </h1>
          <p className="mt-3 text-muted-foreground">
            Get instant AI-powered analysis and optimization suggestions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          {/* Left column - Upload area */}
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                {!file ? (
                  <div
                    className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border bg-muted/50 hover:bg-muted"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}>
                    <motion.div
                      animate={{
                        y: isDragging ? -10 : 0,
                        scale: isDragging ? 1.05 : 1,
                      }}
                      className="mb-4 rounded-full bg-primary/10 p-4 text-primary dark:bg-primary/20">
                      <Upload className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {isDragging
                        ? "Drop your file here"
                        : "Upload your resume"}
                    </h3>
                    <p className="mb-4 text-center text-sm text-muted-foreground">
                      Drag and drop your file here, or click to browse
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline">PDF</Badge>
                      <Badge variant="outline">DOCX</Badge>
                      <Badge variant="outline">DOC</Badge>
                      <Badge variant="outline">TXT</Badge>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="font-medium text-foreground">
                            {file.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        className="h-8 w-8 rounded-full">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {processingStage && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize text-foreground">
                            {processingStage === "uploading"
                              ? "Uploading"
                              : processingStage === "analyzing"
                              ? "Analyzing content"
                              : "Calculating score"}
                          </span>
                          {analysisComplete ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}>
                              <RefreshCw className="h-4 w-4 text-muted-foreground" />
                            </motion.div>
                          )}
                        </div>
                        <Progress value={uploadProgress} className="h-2" />

                        {processingStage === "uploading" && (
                          <p className="text-xs text-muted-foreground">
                            Uploading your resume... {uploadProgress}%
                          </p>
                        )}

                        {processingStage === "analyzing" && (
                          <p className="text-xs text-muted-foreground">
                            Our AI is analyzing your resume content and
                            structure...
                          </p>
                        )}

                        {processingStage === "scoring" && (
                          <p className="text-xs text-muted-foreground">
                            Calculating your resume score and generating
                            recommendations...
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional upload options */}
            {!file && (
              <div className="mt-6 space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  Or use one of these options
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Google Drive
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Dropbox
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right column - Analysis results */}
          <div className="md:col-span-3">
            {!analysisComplete ? (
              <Card className="h-full">
                <CardContent className="flex h-full flex-col items-center justify-center p-6">
                  {!file ? (
                    <div className="text-center">
                      <FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        No resume uploaded yet
                      </h3>
                      <p className="mb-6 text-muted-foreground">
                        Upload your resume to get an instant analysis and
                        optimization suggestions
                      </p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="group">
                        Upload Resume
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex w-full flex-col items-center justify-center space-y-6">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-40 w-40">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="h-full w-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              className="text-muted/20"
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              strokeDasharray="283"
                              strokeDashoffset="283"
                              className="text-primary"
                              animate={{
                                strokeDashoffset:
                                  processingStage === "uploading"
                                    ? 283 - (uploadProgress / 100) * 283
                                    : 0,
                              }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center">
                            <motion.div
                              animate={{
                                rotate:
                                  processingStage === "analyzing" ||
                                  processingStage === "scoring"
                                    ? 360
                                    : 0,
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className={
                                processingStage === "analyzing" ||
                                processingStage === "scoring"
                                  ? "block"
                                  : "hidden"
                              }>
                              <RefreshCw className="h-8 w-8 text-primary" />
                            </motion.div>
                            <span
                              className={`text-2xl font-bold ${
                                processingStage === "uploading"
                                  ? "block"
                                  : "hidden"
                              }`}>
                              {uploadProgress}%
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      <div className="text-center">
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {processingStage === "uploading"
                            ? "Uploading your resume..."
                            : processingStage === "analyzing"
                            ? "Analyzing your resume..."
                            : "Calculating your score..."}
                        </h3>
                        <p className="text-muted-foreground">
                          {processingStage === "uploading"
                            ? "This will only take a moment"
                            : processingStage === "analyzing"
                            ? "Our AI is reviewing your content and structure"
                            : "Almost there! Generating personalized recommendations"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            Resume Analysis
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Here's how your resume performs across key metrics
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-primary/20 text-center">
                                  <span className="text-xl font-bold text-primary">
                                    {resumeScore.overall}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    / 100
                                  </span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Your overall resume score</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <Tabs defaultValue="scores" className="w-full">
                        <TabsList className="mb-4 grid w-full grid-cols-2">
                          <TabsTrigger value="scores">
                            Score Breakdown
                          </TabsTrigger>
                          <TabsTrigger value="recommendations">
                            Recommendations
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="scores" className="space-y-6">
                          {/* Score metrics */}
                          <div className="space-y-4">
                            {[
                              {
                                name: "Content Quality",
                                score: resumeScore.content,
                                color: "bg-green-500",
                              },
                              {
                                name: "Keyword Optimization",
                                score: resumeScore.keywords,
                                color: "bg-amber-500",
                              },
                              {
                                name: "Format & Structure",
                                score: resumeScore.format,
                                color: "bg-blue-500",
                              },
                              {
                                name: "ATS Compatibility",
                                score: resumeScore.atsCompatibility,
                                color: "bg-purple-500",
                              },
                            ].map((metric) => (
                              <div key={metric.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-foreground">
                                    {metric.name}
                                  </span>
                                  <span className="text-sm font-medium text-foreground">
                                    {metric.score}/100
                                  </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                  <motion.div
                                    className={`h-full ${metric.color}`}
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

                          <Separator />

                          <div className="rounded-lg bg-muted p-4">
                            <div className="flex items-start space-x-3">
                              <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                              <div>
                                <h4 className="font-medium text-foreground">
                                  Areas for improvement
                                </h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  Your resume could use improvement in keyword
                                  optimization and ATS compatibility. Click
                                  "Optimize Now" to automatically enhance these
                                  areas.
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent
                          value="recommendations"
                          className="space-y-4">
                          <div className="rounded-lg border border-border p-4">
                            <h4 className="mb-2 font-medium text-foreground">
                              Content Recommendations
                            </h4>
                            <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                              <li>
                                Add more quantifiable achievements to strengthen
                                impact
                              </li>
                              <li>
                                Expand your skills section with relevant
                                technical skills
                              </li>
                              <li>
                                Include a brief professional summary at the top
                              </li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-border p-4">
                            <h4 className="mb-2 font-medium text-foreground">
                              Keyword Optimization
                            </h4>
                            <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                              <li>
                                Add industry-specific keywords like "data
                                analysis" and "project management"
                              </li>
                              <li>
                                Include relevant certifications and tools you're
                                familiar with
                              </li>
                              <li>
                                Match keywords from job descriptions you're
                                targeting
                              </li>
                            </ul>
                          </div>

                          <div className="rounded-lg border border-border p-4">
                            <h4 className="mb-2 font-medium text-foreground">
                              Format Improvements
                            </h4>
                            <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                              <li>
                                Use consistent formatting for dates and headings
                              </li>
                              <li>
                                Improve readability with better spacing between
                                sections
                              </li>
                              <li>
                                Ensure your contact information is prominently
                                displayed
                              </li>
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <Button className="group flex-1" size="lg">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Optimize Now
                          <motion.div
                            className="absolute inset-0 rounded-md bg-white/10"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: [0, 1.05, 1],
                              opacity: [0, 0.5, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                          />
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const faqs = [
  {
    question: "What file formats are supported?",
    answer:
      "We support PDF, DOCX, DOC, and TXT file formats for resume uploads. For best results, we recommend using PDF or DOCX formats.",
  },
  {
    question: "How does the AI analyze my resume?",
    answer:
      "Our AI scans your resume for content quality, keyword optimization, formatting, and ATS compatibility. It compares your resume against industry standards and job market requirements.",
  },
  {
    question: "Is my resume data secure?",
    answer:
      "Yes, we take data security seriously. Your resume is encrypted during transmission and storage. We do not share your personal information with third parties without your consent.",
  },
  {
    question: "How accurate is the resume score?",
    answer:
      "Our resume scoring system is based on analysis of thousands of successful resumes and hiring patterns. While no system is perfect, our scores provide a reliable indication of your resume's strengths and weaknesses.",
  },
];
