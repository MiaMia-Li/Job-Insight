// src/components/resume/optimization/summary.jsx
import {
  BarChart3,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  FileText,
  Layout,
  Target,
  Zap,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OptimizationSummary({ resumeData, setActiveTab }) {
  const metrics = [
    {
      name: "Content Quality",
      score: resumeData.score.content,
      color: "bg-green-500",
      icon: <FileText className="h-4 w-4" />,
      description: "Evaluates the quality and relevance of your resume content",
      findings: [
        "Your work experience lacks quantifiable achievements",
        "Professional summary is missing",
        "Skills section needs expansion",
      ],
    },
    {
      name: "Keyword Optimization",
      score: resumeData.score.keywords,
      color: "bg-amber-500",
      icon: <Target className="h-4 w-4" />,
      description:
        "Measures how well your resume matches job-specific keywords",
      findings: [
        "Missing important industry-specific keywords",
        "Technical skills not properly highlighted",
        "Job-specific terminology is limited",
      ],
    },
    {
      name: "Format & Structure",
      score: resumeData.score.format,
      color: "bg-blue-500",
      icon: <Layout className="h-4 w-4" />,
      description: "Assesses the organization and visual appeal of your resume",
      findings: [
        "Inconsistent formatting in dates and headings",
        "Section spacing could be improved",
        "Too much text in paragraph form",
      ],
    },
    {
      name: "ATS Compatibility",
      score: resumeData.score.atsCompatibility,
      color: "bg-purple-500",
      icon: <Zap className="h-4 w-4" />,
      description:
        "Determines how well your resume will perform with Applicant Tracking Systems",
      findings: [
        "Some formatting may confuse ATS systems",
        "Headers and footers contain important information",
        "Complex tables or graphics may not be parsed correctly",
      ],
    },
  ];

  return (
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
          {metrics.map((metric) => (
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
                    <h4 className="mb-2 text-sm font-medium">Key Findings:</h4>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      {metric.findings.map((finding, index) => (
                        <li key={index}>{finding}</li>
                      ))}
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
                Your resume is missing key industry terms and job-specific
                keywords that could help it pass through ATS systems.
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
                Your work experience lacks quantifiable achievements and your
                skills section needs expansion.
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
  );
}
