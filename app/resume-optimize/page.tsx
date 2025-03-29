// src/app/resume/optimize/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useResumeOptimization } from "../hooks/useResumeOptimization";
import OptimizationImpact from "@/components/resume/OptimizationImpact";
import OptimizationPreview from "@/components/resume/OptimizationPreview";
import OptimizationSuggestions from "@/components/resume/OptimizationSuggestions";
import OptimizationSummary from "@/components/resume/OptimizationSummary";
import OptimizationTabs from "@/components/resume/OptimizationTabs";
import ResumeOptimizationHeader from "@/components/resume/ResumeOptimizationHeader";

export default function ResumeOptimizationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  const {
    resumeData,
    optimizationSuggestions,
    acceptedSuggestions,
    optimizationApplied,
    optimizationInProgress,
    isLoading,
    error,
    toggleSuggestion,
    applyOptimization,
    resetOptimization,
    customizeOptimization,
    activeTab,
    setActiveTab,
  } = useResumeOptimization(resumeId);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error("Failed to load resume data", {
        description: error.message || "Please try again later",
      });
    }
  }, [error]);

  // Redirect if no resume ID is provided
  useEffect(() => {
    if (!resumeId && !isLoading) {
      router.push("/resume/analyze");
    }
  }, [resumeId, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading your resume data...</p>
        </div>
      </div>
    );
  }

  if (!resumeData && !isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-medium">Resume not found</p>
          <Button onClick={() => router.push("/resume/analyze")}>
            Go back to Resume Analysis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background dark:from-black/90 dark:via-black/95 dark:to-black">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-primary/3 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="mx-auto max-w-6xl">
          {/* Header with resume info and score */}
          <ResumeOptimizationHeader
            resumeData={resumeData}
            optimizationApplied={optimizationApplied}
          />

          {/* Main tabs for the optimization flow */}
          <OptimizationTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            resumeData={resumeData}
            optimizationApplied={optimizationApplied}>
            {/* Analysis Tab Content */}
            {activeTab === "analysis" && (
              <div className="space-y-6">
                <OptimizationSummary
                  resumeData={resumeData}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

            {/* Optimization Tab Content */}
            {activeTab === "optimization" && (
              <div className="space-y-6">
                <OptimizationSuggestions
                  resumeData={resumeData}
                  optimizationSuggestions={optimizationSuggestions}
                  acceptedSuggestions={acceptedSuggestions}
                  toggleSuggestion={toggleSuggestion}
                  applyOptimization={applyOptimization}
                  resetOptimization={resetOptimization}
                  optimizationInProgress={optimizationInProgress}
                  optimizationApplied={optimizationApplied}
                  customizeOptimization={customizeOptimization}
                />

                <OptimizationImpact
                  resumeData={resumeData}
                  acceptedSuggestions={acceptedSuggestions}
                />
              </div>
            )}

            {/* Preview Tab Content */}
            {activeTab === "preview" && (
              <OptimizationPreview
                resumeData={resumeData}
                optimizationApplied={optimizationApplied}
                acceptedSuggestions={acceptedSuggestions}
                setActiveTab={setActiveTab}
              />
            )}
          </OptimizationTabs>
        </div>
      </div>
    </div>
  );
}
