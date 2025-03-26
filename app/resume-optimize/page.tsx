"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Download,
  FileText,
  Edit,
  Sparkles,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Check,
  X,
  Eye,
  PenLine,
  BarChart3,
  Target,
  Layout,
  Zap,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ResumeAnalysisPage() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [optimizationApplied, setOptimizationApplied] = useState(false);
  const [optimizationInProgress, setOptimizationInProgress] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [acceptedSuggestions, setAcceptedSuggestions] = useState({
    content: [],
    keywords: [],
    format: [],
  });

  // Toggle suggestion acceptance
  const toggleSuggestion = (category, index) => {
    setAcceptedSuggestions((prev) => {
      const newState = { ...prev };
      if (newState[category].includes(index)) {
        newState[category] = newState[category].filter((i) => i !== index);
      } else {
        newState[category] = [...newState[category], index];
      }
      return newState;
    });
  };

  // Apply optimization
  const applyOptimization = () => {
    setOptimizationInProgress(true);

    // Simulate optimization process
    setTimeout(() => {
      setOptimizationInProgress(false);
      setOptimizationApplied(true);
      setActiveTab("preview");

      // Update resume score after optimization
      setResumeData((prev) => ({
        ...prev,
        score: {
          overall: 92,
          content: 94,
          keywords: 89,
          format: 93,
          atsCompatibility: 90,
        },
      }));
    }, 3000);
  };

  // Reset optimization
  const resetOptimization = () => {
    setOptimizationApplied(false);
    setAcceptedSuggestions({
      content: [],
      keywords: [],
      format: [],
    });
    setResumeData({
      ...resumeData,
      score: initialResumeData.score,
    });
  };

  // Initial resume data
  const initialResumeData = {
    fileName: "john_doe_resume.pdf",
    score: {
      overall: 68,
      content: 72,
      keywords: 58,
      format: 75,
      atsCompatibility: 65,
    },
    suggestions: {
      content: [
        "Add quantifiable achievements to your work experience",
        "Include a professional summary at the top of your resume",
        "Expand your skills section with more technical skills",
        "Add relevant certifications and education details",
      ],
      keywords: [
        "Include industry-specific keywords like 'data analysis' and 'project management'",
        "Add software proficiency relevant to the job (e.g., Excel, SQL, Tableau)",
        "Mention specific methodologies (e.g., Agile, Scrum) if applicable",
        "Include relevant certifications and their acronyms (e.g., PMP, CISSP)",
      ],
      format: [
        "Use consistent formatting for dates and headings",
        "Improve readability with better spacing between sections",
        "Use bullet points instead of paragraphs for work experience",
        "Ensure your contact information is prominently displayed",
      ],
    },
  };

  const [resumeData, setResumeData] = useState(initialResumeData);

  // Calculate total accepted suggestions
  const totalAcceptedSuggestions =
    Object.values(acceptedSuggestions).flat().length;
  const totalSuggestions = Object.values(resumeData.suggestions).flat().length;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Resume Analysis
            </h1>
            <p className="mt-2 text-muted-foreground">
              Review your analysis and apply AI-powered optimizations
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {resumeData.fileName}
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
                        : initialResumeData.score.overall}
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
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    Score Breakdown
                  </CardTitle>
                  <CardDescription>
                    Detailed analysis of your resume performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      name: "Content Quality",
                      score: resumeData.score.content,
                      color: "bg-green-500",
                      icon: <FileText className="h-4 w-4" />,
                      description:
                        "Evaluates the quality and relevance of your resume content",
                    },
                    {
                      name: "Keyword Optimization",
                      score: resumeData.score.keywords,
                      color: "bg-amber-500",
                      icon: <Target className="h-4 w-4" />,
                      description:
                        "Measures how well your resume matches job-specific keywords",
                    },
                    {
                      name: "Format & Structure",
                      score: resumeData.score.format,
                      color: "bg-blue-500",
                      icon: <Layout className="h-4 w-4" />,
                      description:
                        "Assesses the organization and visual appeal of your resume",
                    },
                    {
                      name: "ATS Compatibility",
                      score: resumeData.score.atsCompatibility,
                      color: "bg-purple-500",
                      icon: <Zap className="h-4 w-4" />,
                      description:
                        "Determines how well your resume will perform with Applicant Tracking Systems",
                    },
                  ].map((metric) => (
                    <Accordion type="single" collapsible key={metric.name}>
                      <AccordionItem value={metric.name}>
                        <AccordionTrigger className="py-2">
                          <div className="flex w-full items-center justify-between pr-4">
                            <div className="flex items-center">
                              <div
                                className={`mr-3 rounded-full p-1.5 text-white ${metric.color}`}>
                                {metric.icon}
                              </div>
                              <span>{metric.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-4 font-semibold">
                                {metric.score}/100
                              </span>
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                                <motion.div
                                  className={`h-full ${metric.color}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${metric.score}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-2">
                          <p className="mb-3 text-sm text-muted-foreground">
                            {metric.description}
                          </p>
                          <div className="rounded-lg bg-muted p-3">
                            <h4 className="mb-2 text-sm font-medium">
                              Key Findings:
                            </h4>
                            <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                              {metric.name === "Content Quality" && (
                                <>
                                  <li>
                                    Your work experience lacks quantifiable
                                    achievements
                                  </li>
                                  <li>Professional summary is missing</li>
                                  <li>Skills section needs expansion</li>
                                </>
                              )}
                              {metric.name === "Keyword Optimization" && (
                                <>
                                  <li>
                                    Missing important industry-specific keywords
                                  </li>
                                  <li>
                                    Technical skills not properly highlighted
                                  </li>
                                  <li>Job-specific terminology is limited</li>
                                </>
                              )}
                              {metric.name === "Format & Structure" && (
                                <>
                                  <li>
                                    Inconsistent formatting in dates and
                                    headings
                                  </li>
                                  <li>Section spacing could be improved</li>
                                  <li>Too much text in paragraph form</li>
                                </>
                              )}
                              {metric.name === "ATS Compatibility" && (
                                <>
                                  <li>
                                    Some formatting may confuse ATS systems
                                  </li>
                                  <li>
                                    Headers and footers contain important
                                    information
                                  </li>
                                  <li>
                                    Complex tables or graphics may not be parsed
                                    correctly
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>

              {/* Improvement Areas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                    Areas for Improvement
                  </CardTitle>
                  <CardDescription>
                    Key issues that need attention in your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-border p-4">
                      <h3 className="mb-2 flex items-center font-medium text-foreground">
                        <div className="mr-2 rounded-full bg-amber-100 p-1 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        Keyword Optimization
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your resume is missing key industry terms and
                        job-specific keywords that could help it pass through
                        ATS systems.
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 h-auto p-0 text-sm text-primary"
                        onClick={() => setActiveTab("optimization")}>
                        View suggestions
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <h3 className="mb-2 flex items-center font-medium text-foreground">
                        <div className="mr-2 rounded-full bg-amber-100 p-1 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        Content Enhancement
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your work experience lacks quantifiable achievements and
                        your skills section needs expansion.
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 h-auto p-0 text-sm text-primary"
                        onClick={() => setActiveTab("optimization")}>
                        View suggestions
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <h3 className="mb-2 flex items-center font-medium text-foreground">
                        <div className="mr-2 rounded-full bg-amber-100 p-1 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        Format Improvements
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Inconsistent formatting and spacing issues may affect
                        readability and professional appearance.
                      </p>
                      <Button
                        variant="link"
                        className="mt-2 h-auto p-0 text-sm text-primary"
                        onClick={() => setActiveTab("optimization")}>
                        View suggestions
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setActiveTab("optimization")}>
                    View All Optimization Suggestions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Score Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Comparison</CardTitle>
                <CardDescription>
                  How your resume compares to others in your industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Your Score</p>
                      <p className="text-3xl font-bold text-primary">
                        {resumeData.score.overall}
                      </p>
                    </div>
                    <div>
                      <p className="text-right font-medium text-foreground">
                        Industry Average
                      </p>
                      <p className="text-right text-3xl font-bold text-muted-foreground">
                        76
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Below Average</span>
                      <span>Average</span>
                      <span>Above Average</span>
                    </div>
                    <div className="relative h-3 w-full rounded-full bg-muted">
                      <div className="absolute inset-y-0 left-0 w-[76%] rounded-full bg-muted-foreground/50"></div>
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                        style={{ width: `${resumeData.score.overall}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${resumeData.score.overall}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}>
                        <div className="absolute -right-2 -top-8 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                          {resumeData.score.overall}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          Room for improvement
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Your resume is{" "}
                          {resumeData.score.overall < 76 ? "below" : "near"} the
                          industry average. Applying our optimization
                          suggestions can significantly improve your chances of
                          getting interviews.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActiveTab("optimization")}>
                  Optimize Your Resume
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Optimization Tab */}
          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  Optimization Suggestions
                </CardTitle>
                <CardDescription>
                  Review and select the suggestions you want to apply
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between rounded-lg bg-muted p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Selected Suggestions
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {totalAcceptedSuggestions} of {totalSuggestions}{" "}
                        suggestions selected
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={(totalAcceptedSuggestions / totalSuggestions) * 100}
                    className="h-2 w-32"
                  />
                </div>

                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    <TabsTrigger value="format">Format</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    {resumeData.suggestions.content.map((suggestion, index) => (
                      <motion.div
                        key={`content-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-start justify-between rounded-lg border p-4 transition-colors ${
                          acceptedSuggestions.content.includes(index)
                            ? "border-green-500/50 bg-green-50 dark:border-green-500/30 dark:bg-green-900/10"
                            : "border-border"
                        }`}>
                        <div className="flex items-start space-x-3">
                          <div
                            className={`mt-0.5 rounded-full p-1 ${
                              acceptedSuggestions.content.includes(index)
                                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-muted text-muted-foreground"
                            }`}>
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {suggestion}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {index === 0 &&
                                "Adding measurable achievements makes your experience more impactful."}
                              {index === 1 &&
                                "A professional summary helps recruiters quickly understand your value."}
                              {index === 2 &&
                                "Expanding your skills section shows your full range of capabilities."}
                              {index === 3 &&
                                "Education and certifications add credibility to your profile."}
                            </p>

                            {/* Before/After Example */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="link"
                                  className="mt-1 h-auto p-0 text-xs text-primary">
                                  See example
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    Before & After Example
                                  </DialogTitle>
                                  <DialogDescription>
                                    See how this suggestion improves your resume
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4 md:grid-cols-2">
                                  <div className="rounded-lg border border-border p-4">
                                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                                      Before
                                    </h4>
                                    <p className="text-sm text-foreground">
                                      {index === 0 &&
                                        "Managed a team and improved sales performance."}
                                      {index === 1 &&
                                        "[No professional summary]"}
                                      {index === 2 &&
                                        "Skills: Microsoft Office, Communication"}
                                      {index === 3 &&
                                        "Bachelor's Degree in Business"}
                                    </p>
                                  </div>
                                  <div className="rounded-lg border border-green-500/30 bg-green-50 p-4 dark:bg-green-900/10">
                                    <h4 className="mb-2 text-sm font-medium text-green-600 dark:text-green-400">
                                      After
                                    </h4>
                                    <p className="text-sm text-foreground">
                                      {index === 0 &&
                                        "Managed a team of 12 sales representatives, increasing quarterly sales by 27% and reducing customer churn by 15%."}
                                      {index === 1 &&
                                        "Results-driven Sales Manager with 5+ years of experience leading high-performing teams and exceeding revenue targets in the SaaS industry."}
                                      {index === 2 &&
                                        "Skills: Microsoft Office Suite, CRM Systems (Salesforce, HubSpot), Data Analysis, Team Leadership, Client Relationship Management, Sales Forecasting"}
                                      {index === 3 &&
                                        "Bachelor's Degree in Business Administration, University of Michigan\nCertified Sales Professional (CSP), 2021\nHubSpot Sales Certification, 2022"}
                                    </p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-full ${
                              acceptedSuggestions.content.includes(index)
                                ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => toggleSuggestion("content", index)}>
                            {acceptedSuggestions.content.includes(index) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </TabsContent>

                  <TabsContent value="keywords" className="space-y-4">
                    {resumeData.suggestions.keywords.map(
                      (suggestion, index) => (
                        <motion.div
                          key={`keywords-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex items-start justify-between rounded-lg border p-4 transition-colors ${
                            acceptedSuggestions.keywords.includes(index)
                              ? "border-green-500/50 bg-green-50 dark:border-green-500/30 dark:bg-green-900/10"
                              : "border-border"
                          }`}>
                          <div className="flex items-start space-x-3">
                            <div
                              className={`mt-0.5 rounded-full p-1 ${
                                acceptedSuggestions.keywords.includes(index)
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                              <Target className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {suggestion}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {index === 0 &&
                                  "These keywords are frequently found in job descriptions for your target role."}
                                {index === 1 &&
                                  "Mentioning specific software shows technical proficiency relevant to the position."}
                                {index === 2 &&
                                  "Methodology keywords signal familiarity with industry-standard practices."}
                                {index === 3 &&
                                  "Certification acronyms are often used as search terms by recruiters."}
                              </p>

                              {/* Keyword Frequency */}
                              {index === 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-muted/50">
                                    data analysis (0)
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-muted/50">
                                    project management (0)
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-muted/50">
                                    team leadership (1)
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-8 w-8 rounded-full ${
                                acceptedSuggestions.keywords.includes(index)
                                  ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                              onClick={() =>
                                toggleSuggestion("keywords", index)
                              }>
                              {acceptedSuggestions.keywords.includes(index) ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      )
                    )}
                  </TabsContent>

                  <TabsContent value="format" className="space-y-4">
                    {resumeData.suggestions.format.map((suggestion, index) => (
                      <motion.div
                        key={`format-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-start justify-between rounded-lg border p-4 transition-colors ${
                          acceptedSuggestions.format.includes(index)
                            ? "border-green-500/50 bg-green-50 dark:border-green-500/30 dark:bg-green-900/10"
                            : "border-border"
                        }`}>
                        <div className="flex items-start space-x-3">
                          <div
                            className={`mt-0.5 rounded-full p-1 ${
                              acceptedSuggestions.format.includes(index)
                                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-muted text-muted-foreground"
                            }`}>
                            <Layout className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {suggestion}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {index === 0 &&
                                "Consistent formatting creates a professional impression."}
                              {index === 1 &&
                                "Proper spacing improves readability and visual appeal."}
                              {index === 2 &&
                                "Bullet points make achievements easier to scan quickly."}
                              {index === 3 &&
                                "Prominent contact information ensures recruiters can reach you."}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-full ${
                              acceptedSuggestions.format.includes(index)
                                ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => toggleSuggestion("format", index)}>
                            {acceptedSuggestions.format.includes(index) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full"
                  disabled={
                    totalAcceptedSuggestions === 0 ||
                    optimizationInProgress ||
                    optimizationApplied
                  }
                  onClick={applyOptimization}>
                  {optimizationInProgress ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing Resume...
                    </>
                  ) : optimizationApplied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Optimization Applied
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Apply {totalAcceptedSuggestions} Optimization
                      {totalAcceptedSuggestions !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>

                {optimizationApplied && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetOptimization}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Optimization
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Optimization Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Optimization Impact</CardTitle>
                <CardDescription>
                  How these changes will improve your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Current Score
                      </p>
                      <p className="text-3xl font-bold text-muted-foreground">
                        {initialResumeData.score.overall}
                      </p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="text-right font-medium text-foreground">
                        Potential Score
                      </p>
                      <p className="text-right text-3xl font-bold text-primary">
                        92
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Estimated Improvements
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Interview Chances</span>
                          <span className="text-sm text-green-600 dark:text-green-400">
                            +65%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full w-[65%] bg-green-500"></div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">ATS Compatibility</span>
                          <span className="text-sm text-green-600 dark:text-green-400">
                            +38%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full w-[38%] bg-green-500"></div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Recruiter Readability</span>
                          <span className="text-sm text-green-600 dark:text-green-400">
                            +42%
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full w-[42%] bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          Expert Insight
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Our analysis shows that resumes with scores above 85
                          are 3x more likely to result in interview invitations.
                          The suggested optimizations address the key areas that
                          hiring managers and ATS systems prioritize.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            {!optimizationApplied ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Eye className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">
                  No Preview Available
                </h3>
                <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
                  Apply optimization suggestions first to see your improved
                  resume. Select suggestions from the Optimization tab and click
                  &quot;Apply Optimizations&quot;.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => setActiveTab("optimization")}>
                  Go to Optimization
                </Button>
              </div>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        Optimized Resume
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Switch
                            id="before-after"
                            checked={showBeforeAfter}
                            onCheckedChange={setShowBeforeAfter}
                          />
                          <Label htmlFor="before-after" className="text-sm">
                            Show Before/After
                          </Label>
                        </div>
                      </div>
                    </div>
                    <CardDescription>
                      Preview your optimized resume with all improvements
                      applied
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {showBeforeAfter ? (
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <div className="mb-2 flex items-center">
                            <h3 className="text-sm font-medium text-muted-foreground">
                              Before
                            </h3>
                            <Badge
                              variant="outline"
                              className="ml-2 bg-muted/50">
                              Score: {initialResumeData.score.overall}
                            </Badge>
                          </div>
                          <div className="rounded-lg border border-border p-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-bold">John Doe</h4>
                                <p className="text-sm text-muted-foreground">
                                  email@example.com | (123) 456-7890
                                </p>
                              </div>

                              <div>
                                <h4 className="text-sm font-bold">
                                  EXPERIENCE
                                </h4>
                                <div className="mt-2">
                                  <p className="text-sm font-medium">
                                    Sales Manager, XYZ Company
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Jan 2020 - Present
                                  </p>
                                  <p className="mt-1 text-sm">
                                    Managed a team and improved sales
                                    performance. Responsible for client
                                    relationships and reporting to senior
                                    management.
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-bold">SKILLS</h4>
                                <p className="mt-1 text-sm">
                                  Microsoft Office, Communication
                                </p>
                              </div>

                              <div>
                                <h4 className="text-sm font-bold">EDUCATION</h4>
                                <p className="mt-1 text-sm">
                                  Bachelor&apos;s Degree in Business
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center">
                            <h3 className="text-sm font-medium text-green-600 dark:text-green-400">
                              After
                            </h3>
                            <Badge className="ml-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                              Score: {resumeData.score.overall}
                            </Badge>
                          </div>
                          <div className="rounded-lg border border-green-500/30 bg-green-50/50 p-4 dark:bg-green-900/5">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-bold">John Doe</h4>
                                <p className="text-sm text-muted-foreground">
                                  email@example.com | (123) 456-7890 |
                                  linkedin.com/in/johndoe
                                </p>
                              </div>

                              <div className="rounded-md bg-green-100/50 p-2 dark:bg-green-900/10">
                                <p className="text-sm">
                                  Results-driven Sales Manager with 5+ years of
                                  experience leading high-performing teams and
                                  exceeding revenue targets in the SaaS
                                  industry. Proven track record in client
                                  relationship management, data analysis, and
                                  implementing effective sales strategies.
                                </p>
                              </div>

                              <div>
                                <h4 className="text-sm font-bold">
                                  EXPERIENCE
                                </h4>
                                <div className="mt-2">
                                  <p className="text-sm font-medium">
                                    Sales Manager, XYZ Company
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    January 2020 - Present
                                  </p>
                                  <ul className="mt-1 list-disc pl-5 text-sm">
                                    <li className="rounded-md bg-green-100/50 p-1 dark:bg-green-900/10">
                                      Managed a team of 12 sales
                                      representatives, increasing quarterly
                                      sales by 27% and reducing customer churn
                                      by 15%
                                    </li>
                                    <li className="rounded-md bg-green-100/50 p-1 dark:bg-green-900/10">
                                      Implemented data analysis processes that
                                      improved lead qualification efficiency by
                                      35%
                                    </li>
                                    <li>
                                      Responsible for client relationships and
                                      reporting to senior management
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-bold">SKILLS</h4>
                                <p className="mt-1 text-sm rounded-md bg-green-100/50 p-2 dark:bg-green-900/10">
                                  Microsoft Office Suite, CRM Systems
                                  (Salesforce, HubSpot), Data Analysis, Project
                                  Management, Team Leadership, Client
                                  Relationship Management, Sales Forecasting,
                                  Agile Methodology
                                </p>
                              </div>

                              <div>
                                <h4 className="text-sm font-bold">
                                  EDUCATION & CERTIFICATIONS
                                </h4>
                                <div className="mt-1 text-sm rounded-md bg-green-100/50 p-2 dark:bg-green-900/10">
                                  <p>
                                    Bachelor&apos;s Degree in Business
                                    Administration, University of Michigan
                                  </p>
                                  <p>
                                    Certified Sales Professional (CSP), 2021
                                  </p>
                                  <p>HubSpot Sales Certification, 2022</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border p-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-bold">John Doe</h4>
                            <p className="text-muted-foreground">
                              email@example.com | (123) 456-7890 |
                              linkedin.com/in/johndoe
                            </p>
                          </div>

                          <div>
                            <p>
                              Results-driven Sales Manager with 5+ years of
                              experience leading high-performing teams and
                              exceeding revenue targets in the SaaS industry.
                              Proven track record in client relationship
                              management, data analysis, and implementing
                              effective sales strategies.
                            </p>
                          </div>

                          <div>
                            <h4 className="text-base font-bold">EXPERIENCE</h4>
                            <Separator className="my-2" />
                            <div className="mt-3">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">
                                  Sales Manager, XYZ Company
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  January 2020 - Present
                                </p>
                              </div>
                              <ul className="mt-2 list-disc pl-5 text-sm">
                                <li>
                                  Managed a team of 12 sales representatives,
                                  increasing quarterly sales by 27% and reducing
                                  customer churn by 15%
                                </li>
                                <li>
                                  Implemented data analysis processes that
                                  improved lead qualification efficiency by 35%
                                </li>
                                <li>
                                  Developed and executed strategic sales plans
                                  that resulted in $2.3M in new business
                                </li>
                                <li>
                                  Responsible for client relationships and
                                  reporting to senior management
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-base font-bold">SKILLS</h4>
                            <Separator className="my-2" />
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="secondary">
                                Microsoft Office Suite
                              </Badge>
                              <Badge variant="secondary">
                                CRM Systems (Salesforce, HubSpot)
                              </Badge>
                              <Badge variant="secondary">Data Analysis</Badge>
                              <Badge variant="secondary">
                                Project Management
                              </Badge>
                              <Badge variant="secondary">Team Leadership</Badge>
                              <Badge variant="secondary">
                                Client Relationship Management
                              </Badge>
                              <Badge variant="secondary">
                                Sales Forecasting
                              </Badge>
                              <Badge variant="secondary">
                                Agile Methodology
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-base font-bold">
                              EDUCATION & CERTIFICATIONS
                            </h4>
                            <Separator className="my-2" />
                            <div className="mt-2 space-y-2 text-sm">
                              <div>
                                <p className="font-medium">
                                  Bachelor&apos;s Degree in Business
                                  Administration
                                </p>
                                <p className="text-muted-foreground">
                                  University of Michigan, 2015
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">
                                  Certified Sales Professional (CSP)
                                </p>
                                <p className="text-muted-foreground">
                                  Sales Leadership Council, 2021
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">
                                  HubSpot Sales Certification
                                </p>
                                <p className="text-muted-foreground">
                                  HubSpot Academy, 2022
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => {
                        // In a real app, this would trigger a PDF preview
                        window.open("#", "_blank");
                      }}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview as PDF
                    </Button>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => {
                        // In a real app, this would trigger a download
                        alert("Resume downloaded successfully!");
                      }}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                  </CardFooter>
                </Card>

                {/* Improvement Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Summary</CardTitle>
                    <CardDescription>
                      Key improvements made to your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Score Improvement</p>
                            <p className="text-sm text-muted-foreground">
                              Your resume score increased significantly
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">
                            {initialResumeData.score.overall}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {resumeData.score.overall}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="mb-3 text-sm font-medium">
                          Applied Improvements
                        </h4>
                        <div className="space-y-3">
                          {acceptedSuggestions.content.length > 0 && (
                            <div className="rounded-lg border p-3">
                              <h5 className="flex items-center text-sm font-medium">
                                <FileText className="mr-2 h-4 w-4 text-primary" />
                                Content Improvements
                              </h5>
                              <ul className="mt-2 space-y-1 pl-6 text-sm text-muted-foreground">
                                {acceptedSuggestions.content.map((index) => (
                                  <li
                                    key={`summary-content-${index}`}
                                    className="list-disc">
                                    {resumeData.suggestions.content[index]}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {acceptedSuggestions.keywords.length > 0 && (
                            <div className="rounded-lg border p-3">
                              <h5 className="flex items-center text-sm font-medium">
                                <Target className="mr-2 h-4 w-4 text-primary" />
                                Keyword Improvements
                              </h5>
                              <ul className="mt-2 space-y-1 pl-6 text-sm text-muted-foreground">
                                {acceptedSuggestions.keywords.map((index) => (
                                  <li
                                    key={`summary-keywords-${index}`}
                                    className="list-disc">
                                    {resumeData.suggestions.keywords[index]}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {acceptedSuggestions.format.length > 0 && (
                            <div className="rounded-lg border p-3">
                              <h5 className="flex items-center text-sm font-medium">
                                <Layout className="mr-2 h-4 w-4 text-primary" />
                                Format Improvements
                              </h5>
                              <ul className="mt-2 space-y-1 pl-6 text-sm text-muted-foreground">
                                {acceptedSuggestions.format.map((index) => (
                                  <li
                                    key={`summary-format-${index}`}
                                    className="list-disc">
                                    {resumeData.suggestions.format[index]}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="rounded-lg bg-muted p-4 w-full">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-medium text-foreground">
                            Next Steps
                          </h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Your resume is now optimized for your target roles.
                            Download it and start applying to jobs, or make
                            further edits to customize it for specific
                            positions.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Button size="sm" variant="outline">
                              <PenLine className="mr-2 h-3 w-3" />
                              Make More Edits
                            </Button>
                            <Button size="sm">
                              <Download className="mr-2 h-3 w-3" />
                              Download Resume
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
