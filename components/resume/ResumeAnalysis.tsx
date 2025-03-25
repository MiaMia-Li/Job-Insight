import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Download,
} from "lucide-react";
import { Tooltip } from "recharts";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const ResumeAnalysis = ({
  resumeScore = {},
  analysisComplete = true,
  file = true,
}) => {
  return (
    <div className="md:col-span-3">
      {!analysisComplete ? (
        <Card className="h-full">
          <CardContent className="flex h-full flex-col items-center justify-center p-6">
            {!file ? null : (
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
                          processingStage === "uploading" ? "block" : "hidden"
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
                    <TabsTrigger value="scores">Score Breakdown</TabsTrigger>
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
                            optimization and ATS compatibility. Click "Optimize
                            Now" to automatically enhance these areas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-4">
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
                          Expand your skills section with relevant technical
                          skills
                        </li>
                        <li>Include a brief professional summary at the top</li>
                      </ul>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <h4 className="mb-2 font-medium text-foreground">
                        Keyword Optimization
                      </h4>
                      <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                          Add industry-specific keywords like "data analysis"
                          and "project management"
                        </li>
                        <li>
                          Include relevant certifications and tools you're
                          familiar with
                        </li>
                        <li>
                          Match keywords from job descriptions you're targeting
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
  );
};

export default ResumeAnalysis;
