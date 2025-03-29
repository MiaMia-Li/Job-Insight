// src/components/resume/optimization/header.jsx
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ResumeOptimizationHeader({
  resumeData,
  optimizationApplied,
}) {
  console.log("--resumeData", resumeData);
  if (!resumeData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Resume Optimization
        </h1>
        <p className="mt-2 text-muted-foreground">
          Apply AI-powered improvements to make your resume stand out
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {resumeData.fileName || "resume.pdf"}
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 transition-colors ${
                  optimizationApplied
                    ? "border-green-500/20 text-green-500"
                    : "border-primary/20 text-primary"
                }`}>
                <span className="text-xl font-bold">
                  {optimizationApplied
                    ? resumeData.score.overall
                    : resumeData.score.overall}
                </span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your overall resume score</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
