"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  RefreshCw,
  Zap,
  ChevronRight,
  FileUp,
  Briefcase,
  FileCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import JobDescription from "@/components/resume/JobDescription";
import ResumeAnalysis from "@/components/resume/ResumeAnalysis";
import ResumeUploader from "@/components/resume/ResumeUpload";
import { toast } from "sonner";

export default function ResumeUploadPage() {
  const router = useRouter();
  const [resumeScore, setResumeScore] = useState<any>();
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
        throw new Error(errorData.message || "Failed to analyze resume");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      let decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;

          try {
            // Try to parse the accumulated JSON
            const parsedData = JSON.parse(result);
            setResumeScore(parsedData);
            setCurrentStep("analysis");
          } catch (e) {
            // If parsing fails, continue accumulating chunks
            continue;
          }
        }
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast("Analysis failed");
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
        throw new Error(errorData.message || "Failed to analyze resume");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      let decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;

          try {
            // Try to parse the accumulated JSON
            const parsedData = JSON.parse(result);
            setResumeScore(parsedData);
            setCurrentStep("analysis");
          } catch (e) {
            // If parsing fails, continue accumulating chunks
            continue;
          }
        }
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast("Analysis failed");
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
      emoji: "📃",
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
      emoji: "💼",
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
      emoji: "🧐",
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 via-primary/3 to-background dark:from-black/90 dark:via-black/95 dark:to-black">
      <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="pb-16 pt-16">
          <ol className="flex flex-col lg:flex-row items-center w-full space-y-4 lg:space-y-0 lg:space-x-0">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;
              const isLast = index === steps.length - 1;

              return (
                <li key={step.id} className="flex-1 w-full">
                  <a
                    className={`flex items-center font-medium pr-4 w-full rounded-lg transition-all duration-500 relative overflow-hidden hover:shadow-md ${
                      isActive || isCompleted
                        ? "bg-primary/10 hover:bg-primary/15"
                        : "bg-secondary-foreground/5 hover:bg-secondary-foreground/10"
                    }`}>
                    <span
                      className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex justify-center items-center mr-3 text-sm
                      transition-all duration-300 relative z-10 group
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : isCompleted
                          ? "bg-primary/20 border border-primary text-primary"
                          : "bg-muted border border-border text-muted-foreground"
                      }`}>
                      {isCompleted ? (
                        <svg
                          className="w-5 h-5 animate-check-mark"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span
                          className={isActive ? "animate-number-bounce" : ""}>
                          {index + 1}
                        </span>
                      )}
                    </span>
                    <h4
                      className={`text-base transition-colors duration-300 ${
                        isActive
                          ? "text-primary font-medium"
                          : isCompleted
                          ? "text-primary/80"
                          : "text-foreground"
                      }`}>
                      {step.title}
                    </h4>

                    {!isLast && (
                      <svg
                        className={`hidden lg:block w-5 h-5 ml-auto transition-all duration-300 ${
                          isActive || isCompleted
                            ? "stroke-primary"
                            : "stroke-muted-foreground"
                        } ${isActive ? "animate-arrow-pulse" : ""}`}
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

        {/* Main content area with side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left side - Illustration */}
          <motion.div
            key={`illustration-${currentStep}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/5 flex flex-col justify-center items-start sticky top-24 self-start">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={steps.find((s) => s.id === currentStep)?.illustration}
                alt={steps.find((s) => s.id === currentStep)?.altText}
                className="object-contain"
                fill
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
                  <ResumeUploader onContinue={handleContinue} />
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
                        onClick={handleSkipJobDescription}
                        disabled={isLoading}>
                        Skip this step
                      </Button>
                      <Button
                        onClick={handleJobDescriptionSubmit}
                        disabled={!description.trim() || isLoading}>
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
