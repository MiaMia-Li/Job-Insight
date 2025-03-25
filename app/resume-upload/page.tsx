"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Upload,
  FileText,
  File,
  X,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Zap,
  BarChart,
  ChevronRight,
  FileUp,
  Briefcase,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Import components
import FileUploader from "@/components/resume/FileUploader";
import JobDescription from "@/components/resume/JobDescription";
import ResumeAnalysis from "@/components/resume/ResumeAnalysis";
import { toast } from "sonner";
import ResumeUploader from "@/components/resume/ResumeUpload";

export default function ResumeUploadPage() {
  const router = useRouter();
  const [resumeScore, setResumeScore] = useState(null);

  // Job description state
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [currentStep, setCurrentStep] = useState("upload"); // upload, job, analysis

  // // Simulate the analysis process
  // const simulateAnalysis = () => {
  //   setTimeout(() => {
  //     setProcessingStage("scoring");
  //     setTimeout(() => {
  //       setAnalysisComplete(true);
  //       setCurrentStep("job");
  //       setResumeScore({
  //         overall: 68,
  //         content: 72,
  //         keywords: 58,
  //         format: 75,
  //         atsCompatibility: 65,
  //       });
  //     }, 2000);
  //   }, 3000);
  // };

  // Handle job description submission
  const handleJobDescriptionSubmit = () => {
    // In a real app, you would send this data to your backend
    setCurrentStep("analysis");
  };

  // Skip job description step
  const handleSkipJobDescription = () => {
    setCurrentStep("analysis");
  };

  // Navigate to resume optimization page
  const handleOptimizeResume = () => {
    router.push("/resume-optimize");
  };

  // 处理继续按钮点击事件
  const handleContinue = () => {
    setCurrentStep("job");
  };

  // 处理文件上传完成事件
  const handleUploadComplete = (fileUrl: string) => {
    console.log("File uploaded successfully:", fileUrl);
    // setResumeFileUrl(fileUrl);
    // 可以在这里执行其他操作，如保存到全局状态等
  };

  // Step data with illustrations
  const steps = [
    {
      id: "upload",
      title: "Upload Resume",
      description:
        "Upload your resume file to get started with the analysis process.",
      icon: <FileUp className="h-5 w-5" />,
      illustration:
        "https://storysnap.support-0bf.workers.dev/template/1742907411272-Healthy_habit-cuate.png",
      altText: "Person uploading a resume document",
    },
    {
      id: "job",
      title: "Job Description",
      description:
        "Add job details to see how well your resume matches the position requirements.",
      icon: <Briefcase className="h-5 w-5" />,
      illustration:
        "https://storysnap.support-0bf.workers.dev/template/1742908423844-Running-cuate.png",
      altText: "Person writing job requirements",
    },
    {
      id: "analysis",
      title: "Analysis Results",
      description:
        "Review your resume score and get personalized optimization recommendations.",
      icon: <FileCheck className="h-5 w-5" />,
      illustration:
        "https://storysnap.support-0bf.workers.dev/template/1742908736275-Finish_line-cuate.png", // Path to your illustration
      altText: "Chart showing resume analysis results",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="pb-16 mx-auto pt-20">
          <ol className="lg:flex items-center justify-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;
              const isLast = index === steps.length - 1;

              return (
                <li key={step.id} className="relative">
                  <a className="flex items-center font-medium w-full">
                    <span
                      className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex justify-center items-center mr-3 text-sm
              ${
                isActive || isCompleted
                  ? "bg-primary border border-transparent text-white"
                  : "bg-background border border-border text-foreground"
              }`}>
                      {index + 1}
                    </span>
                    <div className="block">
                      <h4
                        className={`text-base ${
                          isActive || isCompleted
                            ? "text-primary"
                            : "text-foreground"
                        }`}>
                        {step.title}
                      </h4>
                    </div>
                    {!isLast && (
                      <svg
                        className={`w-5 h-5 ml-2 sm:ml-4 ${
                          isActive || isCompleted
                            ? "stroke-primary"
                            : "stroke-foreground"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Main content area with side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left side - Illustration */}
          <motion.div
            key={`illustration-${currentStep}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/5 flex flex-col justify-center items-start sticky top-24 self-start">
            <div className="mb-2">
              <h2 className="text-xl font-bold mb-2">
                {steps.find((s) => s.id === currentStep)?.title}
              </h2>
              <p className="text-muted-foreground">
                {steps.find((s) => s.id === currentStep)?.description}
              </p>
            </div>
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={steps.find((s) => s.id === currentStep)?.illustration}
                alt={steps.find((s) => s.id === currentStep)?.altText}
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="w-full lg:w-3/5">
            <AnimatePresence mode="wait">
              {/* Step 1: Upload Resume */}
              {currentStep === "upload" && (
                <motion.div
                  key="upload-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}>
                  <ResumeUploader
                    onUploadComplete={handleUploadComplete}
                    onContinue={handleContinue}
                  />
                </motion.div>
              )}

              {/* Step 2: Job Description */}
              {currentStep === "job" && (
                <motion.div
                  key="job-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}>
                  <JobDescription
                    jobTitle={jobTitle}
                    setJobTitle={setJobTitle}
                    company={company}
                    setCompany={setCompany}
                    location={location}
                    setLocation={setLocation}
                    description={description}
                    setDescription={setDescription}
                  />

                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep("upload")}>
                      Back
                    </Button>
                    <div className="space-x-4">
                      <Button
                        variant="outline"
                        onClick={handleSkipJobDescription}>
                        Skip this step
                      </Button>
                      <Button
                        onClick={handleJobDescriptionSubmit}
                        disabled={!description.trim()}>
                        Analyze Match
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Analysis Results */}
              {currentStep === "analysis" && (
                <motion.div
                  key="analysis-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}>
                  <ResumeAnalysis resumeScore={resumeScore} />

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep("job")}>
                      Back to Job Description
                    </Button>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep("upload")}
                        className="text-muted-foreground">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Analyze Another Resume
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleOptimizeResume}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                        <Zap className="mr-2 h-5 w-5" />
                        Optimize My Resume
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
