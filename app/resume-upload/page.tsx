"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  RefreshCw,
  ChevronRight,
  FileUp,
  Briefcase,
  FileCheck,
  Loader2,
  Zap,
  ChevronLeft,
  ChevronRightIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import JobDescription from "@/components/resume/JobDescription";
import ResumeAnalysis from "@/components/resume/ResumeAnalysis";
import ResumeUploader from "@/components/resume/ResumeUpload";
import { toast } from "sonner";
import { DetailedAnalysis } from "@/types";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useAuth } from "@/providers/auth-context";

export default function ResumeUploadPage() {
  const router = useRouter();
  const [resumeScore, setResumeScore] = useState<DetailedAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Job description state
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [currentStep, setCurrentStep] = useState("upload"); // upload, job, analysis

  // Handle job description submission with API call
  const handleJobDescriptionSubmit = async () => {
    if (!resumeFile) {
      toast("Resume required");
      setCurrentStep("upload");
      return;
    }

    setIsLoading(true);

    try {
      // Create form data to send resume file and job details
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobTitle", jobTitle);
      formData.append("company", company);
      formData.append("location", location);
      formData.append("description", description);

      const response = await fetch("/api/resume/score", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log("--handleJobDescriptionSubmit", data);
      setResumeScore(data);
      setCurrentStep("analysis");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error((error as any).message || "Failed to analyze resume");
    } finally {
      setIsLoading(false);
    }
  };

  // Skip job description step with API call (simpler analysis)
  const handleSkipJobDescription = async () => {
    if (!resumeFile) {
      toast("Resume required");
      setCurrentStep("upload");
      return;
    }

    setIsLoading(true);

    try {
      // Create form data with just the resume
      const formData = new FormData();
      formData.append("resume", resumeFile);
      // Indicate this is a basic analysis without job description
      formData.append("analysisType", "basic");

      const response = await fetch("/api/resume/score", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log("--response", data);

      setResumeScore(data);
      setCurrentStep("analysis");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error((error as any).message || "Failed to analyze resume");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to resume optimization page
  const handleOptimizeResume = () => {
    router.push("/resume-optimize");
  };

  // 处理继续按钮点击事件
  const handleContinue = (file: File) => {
    setResumeFile(file);
    setCurrentStep("job");
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background dark:from-black/90 dark:via-black/95 dark:to-black">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-primary/3 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <h3 className="text-lg font-medium">Analyzing your resume...</h3>
              <p className="text-muted-foreground text-sm mt-2">
                This may take a moment
              </p>
            </div>
          </div>
        )}

        {/* Header with progress indicator */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Resume Analyzer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Analyze how well your resume matches job requirements and get
            personalized recommendations.
          </p>

          {/* Horizontal progress indicator for larger screens */}
          <div className="hidden md:flex justify-center items-center max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;

              return (
                <React.Fragment key={step.id}>
                  {/* Step indicator */}
                  <div
                    className="flex flex-col items-center relative cursor-pointer"
                    onClick={() => {
                      const currentIndex = steps.findIndex(
                        (s) => s.id === currentStep
                      );
                      if (index <= currentIndex) {
                        setCurrentStep(step.id);
                      }
                    }}>
                    {/* Step number/icon */}
                    <div
                      className={`
                  w-10 h-10 rounded-full flex items-center justify-center z-10
                  transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary/20 border-2 border-primary text-primary"
                      : "bg-muted text-muted-foreground"
                  }
                `}>
                      {isCompleted ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* Step title */}
                    <span
                      className={`
                  absolute -bottom-8 whitespace-nowrap text-sm font-medium
                  ${
                    isActive || isCompleted
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                `}>
                      {step.title}
                    </span>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="w-24 h-[2px] mx-2">
                      <div
                        className={`
                    h-full transition-all duration-500
                    ${isCompleted ? "bg-primary" : "bg-muted"}
                  `}></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main content area */}
        <div className="max-w-6xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Steps and Illustration */}
            <div className="w-full lg:w-2/5 bg-muted/30 dark:bg-muted/10 p-6 lg:p-8 border-r border-border/50">
              {/* Steps list - Vertical for all screen sizes */}
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-4 text-foreground/80">
                  Your Progress
                </h2>
                <ol className="space-y-4">
                  {steps.map((step, index) => {
                    const isActive = currentStep === step.id;
                    const isCompleted =
                      steps.findIndex((s) => s.id === currentStep) > index;

                    return (
                      <li
                        key={step.id}
                        onClick={() => {
                          const currentIndex = steps.findIndex(
                            (s) => s.id === currentStep
                          );
                          if (index <= currentIndex) {
                            setCurrentStep(step.id);
                          }
                        }}
                        className={`
                      flex items-start gap-4 p-3 rounded-lg transition-all duration-300
                      ${isActive ? "bg-primary/10 dark:bg-primary/20" : ""}
                      ${
                        index <= steps.findIndex((s) => s.id === currentStep)
                          ? "cursor-pointer hover:bg-muted/70"
                          : "opacity-60"
                      }
                    `}>
                        <div className="flex-shrink-0 flex items-center justify-center mt-0.5">
                          {isCompleted ? (
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                              <CheckIcon className="h-3.5 w-3.5" />
                            </div>
                          ) : isActive ? (
                            <div className="w-6 h-6 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-primary"></div>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-muted-foreground/30 dark:bg-muted"></div>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3
                            className={`
                        font-medium leading-tight
                        ${
                          isActive
                            ? "text-primary"
                            : isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      `}>
                            {step.title}
                          </h3>
                          <p
                            className={`
                        text-sm mt-1
                        ${
                          isActive
                            ? "text-primary/80"
                            : "text-muted-foreground/80"
                        }
                      `}>
                            {step.description}
                          </p>
                        </div>

                        {/* Navigation arrow for completed steps */}
                        {isCompleted && !isActive && (
                          <ChevronRightIcon className="h-5 w-5 text-muted-foreground/50 self-center" />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Illustration */}
              <div className="relative aspect-square overflow-hidden">
                <motion.div
                  key={`illustration-${currentStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 p-4 flex items-center justify-center">
                  <Image
                    src={steps.find((s) => s.id === currentStep)!.illustration}
                    alt={steps.find((s) => s.id === currentStep)!.altText}
                    className="object-contain max-h-full"
                    fill
                    priority
                  />
                </motion.div>

                {/* Step indicator dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {steps.map((step, index) => (
                    <button
                      key={`dot-${step.id}`}
                      onClick={() => {
                        const currentIndex = steps.findIndex(
                          (s) => s.id === currentStep
                        );
                        if (index <= currentIndex) {
                          setCurrentStep(step.id);
                        }
                      }}
                      className={`
                    rounded-full transition-all duration-300
                    ${
                      currentStep === step.id
                        ? "bg-primary w-4 h-1.5"
                        : index < steps.findIndex((s) => s.id === currentStep)
                        ? "bg-primary/60 w-1.5 h-1.5"
                        : "bg-muted-foreground/30 w-1.5 h-1.5"
                    }
                    ${
                      index <= steps.findIndex((s) => s.id === currentStep)
                        ? "cursor-pointer hover:opacity-80"
                        : ""
                    }
                  `}
                      aria-label={`Go to step ${index + 1}: ${step.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            {/* Right side - Content */}
            <div className="w-full lg:w-3/5 p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Upload Resume */}
                {currentStep === "upload" && (
                  <motion.div
                    key="upload-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="h-full flex flex-col">
                    <ResumeUploader onContinue={handleContinue} />
                  </motion.div>
                )}

                {/* Step 2: Job Description */}
                {currentStep === "job" && (
                  <motion.div
                    key="job-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="h-full flex flex-col">
                    <div className="flex-grow">
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
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep("upload")}
                        className="group">
                        <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back
                      </Button>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          onClick={handleSkipJobDescription}
                          disabled={isLoading}>
                          Skip this step
                        </Button>
                        <Button
                          onClick={handleJobDescriptionSubmit}
                          disabled={!description.trim() || isLoading}
                          className="relative overflow-hidden group">
                          <span className="relative z-10 flex items-center">
                            Analyze Match
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                          {isLoading && (
                            <span className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <Loader2 className="h-5 w-5 animate-spin" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Analysis Results */}
                {currentStep === "analysis" && (
                  <motion.div
                    key="analysis-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="h-full flex flex-col">
                    <div className="flex-grow">
                      <div className="flex justify-end mb-4">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-primary/20">
                          {resumeScore?.overallMatch
                            ? `${resumeScore.overallMatch}% Match`
                            : "Analysis Complete"}
                        </Badge>
                      </div>

                      <ResumeAnalysis result={resumeScore} />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep("job")}
                        className="group">
                        <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Job Description
                      </Button>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep("upload")}
                          className="text-muted-foreground group">
                          <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                          Analyze Another Resume
                        </Button>
                        <Button
                          size="lg"
                          onClick={() => {
                            /* handleOptimizeResume */
                          }}
                          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-shadow">
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
    </div>
  );
}
