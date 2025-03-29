// src/components/resume/optimization/preview.jsx
import { useState } from "react";
import {
  Eye,
  Download,
  FileText,
  ArrowRight,
  CheckCircle,
  PenLine,
  RefreshCw,
  Target,
  Layout,
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OptimizationPreview({
  resumeData,
  optimizationApplied,
  acceptedSuggestions,
  setActiveTab,
}) {
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState("resume");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!optimizationApplied) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Eye className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No Preview Available</h3>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          Apply optimization suggestions first to see your improved resume.
          Select suggestions from the Optimization tab and click &quot;Apply
          Optimizations&quot;.
        </p>
        <Button className="mt-6" onClick={() => setActiveTab("optimization")}>
          Go to Optimization
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            Preview your optimized resume with all improvements applied
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activePreviewTab}
            onValueChange={setActivePreviewTab}
            className="mb-6">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="ats">ATS View</TabsTrigger>
            </TabsList>
          </Tabs>

          {showBeforeAfter ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Before
                  </h3>
                  <Badge variant="outline" className="ml-2 bg-muted/50">
                    Score: {resumeData.score.overall}
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
                      <h4 className="text-sm font-bold">EXPERIENCE</h4>
                      <div className="mt-2">
                        <p className="text-sm font-medium">
                          Sales Manager, XYZ Company
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Jan 2020 - Present
                        </p>
                        <p className="mt-1 text-sm">
                          Managed a team and improved sales performance.
                          Responsible for client relationships and reporting to
                          senior management.
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
                        Results-driven Sales Manager with 5+ years of experience
                        leading high-performing teams and exceeding revenue
                        targets in the SaaS industry. Proven track record in
                        client relationship management, data analysis, and
                        implementing effective sales strategies.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold">EXPERIENCE</h4>
                      <div className="mt-2">
                        <p className="text-sm font-medium">
                          Sales Manager, XYZ Company
                        </p>
                        <p className="text-xs text-muted-foreground">
                          January 2020 - Present
                        </p>
                        <ul className="mt-1 list-disc pl-5 text-sm">
                          <li className="rounded-md bg-green-100/50 p-1 dark:bg-green-900/10">
                            Managed a team of 12 sales representatives,
                            increasing quarterly sales by 27% and reducing
                            customer churn by 15%
                          </li>
                          <li className="rounded-md bg-green-100/50 p-1 dark:bg-green-900/10">
                            Implemented data analysis processes that improved
                            lead qualification efficiency by 35%
                          </li>
                          <li>
                            Responsible for client relationships and reporting
                            to senior management
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold">SKILLS</h4>
                      <p className="mt-1 text-sm rounded-md bg-green-100/50 p-2 dark:bg-green-900/10">
                        Microsoft Office Suite, CRM Systems (Salesforce,
                        HubSpot), Data Analysis, Project Management, Team
                        Leadership, Client Relationship Management, Sales
                        Forecasting, Agile Methodology
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold">
                        EDUCATION & CERTIFICATIONS
                      </h4>
                      <div className="mt-1 text-sm rounded-md bg-green-100/50 p-2 dark:bg-green-900/10">
                        <p>
                          Bachelor&apos;s Degree in Business Administration,
                          University of Michigan
                        </p>
                        <p>Certified Sales Professional (CSP), 2021</p>
                        <p>HubSpot Sales Certification, 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border p-6">
              {activePreviewTab === "resume" ? (
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
                      Results-driven Sales Manager with 5+ years of experience
                      leading high-performing teams and exceeding revenue
                      targets in the SaaS industry. Proven track record in
                      client relationship management, data analysis, and
                      implementing effective sales strategies.
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
                          Managed a team of 12 sales representatives, increasing
                          quarterly sales by 27% and reducing customer churn by
                          15%
                        </li>
                        <li>
                          Implemented data analysis processes that improved lead
                          qualification efficiency by 35%
                        </li>
                        <li>
                          Developed and executed strategic sales plans that
                          resulted in $2.3M in new business
                        </li>
                        <li>
                          Responsible for client relationships and reporting to
                          senior management
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold">SKILLS</h4>
                    <Separator className="my-2" />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">Microsoft Office Suite</Badge>
                      <Badge variant="secondary">
                        CRM Systems (Salesforce, HubSpot)
                      </Badge>
                      <Badge variant="secondary">Data Analysis</Badge>
                      <Badge variant="secondary">Project Management</Badge>
                      <Badge variant="secondary">Team Leadership</Badge>
                      <Badge variant="secondary">
                        Client Relationship Management
                      </Badge>
                      <Badge variant="secondary">Sales Forecasting</Badge>
                      <Badge variant="secondary">Agile Methodology</Badge>
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
                          Bachelor&apos;s Degree in Business Administration
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
              ) : (
                <div className="space-y-6">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="mb-2 text-sm font-medium">
                      ATS View Explanation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      This view shows how your resume might be parsed by
                      Applicant Tracking Systems. ATS // Continuing from
                      src/components/resume/optimization/preview.jsx ATS systems
                      often strip formatting and organize content into plain
                      text. Keywords that match job descriptions are
                      highlighted.
                    </p>
                  </div>

                  <div className="font-mono text-sm">
                    <p>JOHN DOE</p>
                    <p>
                      email@example.com | (123) 456-7890 |
                      linkedin.com/in/johndoe
                    </p>
                    <br />
                    <p>
                      Results-driven{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        Sales Manager
                      </span>{" "}
                      with 5+ years of experience leading high-performing teams
                      and exceeding{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        revenue targets
                      </span>{" "}
                      in the SaaS industry. Proven track record in{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        client relationship management
                      </span>
                      ,{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        data analysis
                      </span>
                      , and implementing effective{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        sales strategies
                      </span>
                      .
                    </p>
                    <br />
                    <p>EXPERIENCE</p>
                    <p>Sales Manager, XYZ Company (January 2020 - Present)</p>
                    <p>
                      - Managed a team of 12 sales representatives, increasing
                      quarterly sales by 27% and reducing customer churn by 15%
                    </p>
                    <p>
                      - Implemented{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        data analysis
                      </span>{" "}
                      processes that improved lead qualification efficiency by
                      35%
                    </p>
                    <p>
                      - Developed and executed strategic{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        sales plans
                      </span>{" "}
                      that resulted in $2.3M in new business
                    </p>
                    <p>
                      - Responsible for{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        client relationships
                      </span>{" "}
                      and reporting to senior management
                    </p>
                    <br />
                    <p>SKILLS</p>
                    <p>
                      Microsoft Office Suite,{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        CRM Systems
                      </span>{" "}
                      (Salesforce, HubSpot),{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        Data Analysis
                      </span>
                      ,{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        Project Management
                      </span>
                      ,{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        Team Leadership
                      </span>
                      ,{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        Client Relationship Management
                      </span>
                      ,{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        Sales Forecasting
                      </span>
                      ,{" "}
                      <span className="bg-yellow-100 dark:bg-yellow-900/30">
                        Agile Methodology
                      </span>
                    </p>
                    <br />
                    <p>EDUCATION & CERTIFICATIONS</p>
                    <p>
                      Bachelor's Degree in Business Administration, University
                      of Michigan, 2015
                    </p>
                    <p>
                      Certified Sales Professional (CSP), Sales Leadership
                      Council, 2021
                    </p>
                    <p>HubSpot Sales Certification, HubSpot Academy, 2022</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Edit Optimized Resume</DialogTitle>
                <DialogDescription>
                  Make additional changes to your optimized resume
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="resumeContent">Resume Content</Label>
                  <Textarea
                    id="resumeContent"
                    rows={20}
                    defaultValue={`John Doe
email@example.com | (123) 456-7890 | linkedin.com/in/johndoe

Results-driven Sales Manager with 5+ years of experience leading high-performing teams and exceeding revenue targets in the SaaS industry. Proven track record in client relationship management, data analysis, and implementing effective sales strategies.

EXPERIENCE
Sales Manager, XYZ Company (January 2020 - Present)
- Managed a team of 12 sales representatives, increasing quarterly sales by 27% and reducing customer churn by 15%
- Implemented data analysis processes that improved lead qualification efficiency by 35%
- Developed and executed strategic sales plans that resulted in $2.3M in new business
- Responsible for client relationships and reporting to senior management

SKILLS
Microsoft Office Suite, CRM Systems (Salesforce, HubSpot), Data Analysis, Project Management, Team Leadership, Client Relationship Management, Sales Forecasting, Agile Methodology

EDUCATION & CERTIFICATIONS
Bachelor's Degree in Business Administration, University of Michigan, 2015
Certified Sales Professional (CSP), Sales Leadership Council, 2021
HubSpot Sales Certification, HubSpot Academy, 2022`}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex w-full space-x-2 sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-initial"
              onClick={() => setIsEditDialogOpen(true)}>
              <PenLine className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-initial">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
          <div className="flex w-full space-x-2 sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-initial"
              onClick={() => setActiveTab("optimization")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Modify Optimizations
            </Button>
            <Button className="flex-1 sm:flex-initial">
              <CheckCircle className="mr-2 h-4 w-4" />
              Save Resume
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            Applied Optimizations
          </CardTitle>
          <CardDescription>
            Summary of all improvements applied to your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(acceptedSuggestions).map(([category, indices]) => {
              if (indices.length === 0) return null;

              const categoryLabels = {
                content: "Content Improvements",
                keywords: "Keyword Optimizations",
                format: "Format Enhancements",
                custom: "Custom Optimizations",
              };

              const categoryIcons = {
                content: <FileText className="h-4 w-4" />,
                keywords: <Target className="h-4 w-4" />,
                format: <Layout className="h-4 w-4" />,
                custom: <Zap className="h-4 w-4" />,
              };

              return (
                <div key={category} className="rounded-lg border p-4">
                  <h3 className="mb-3 flex items-center font-medium">
                    <div className="mr-2 rounded-full bg-green-100 p-1 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      {categoryIcons[category]}
                    </div>
                    {categoryLabels[category]}
                    <Badge className="ml-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      {indices.length}
                    </Badge>
                  </h3>
                  <ul className="space-y-2">
                    {indices.map((index) => (
                      <li
                        key={`${category}-${index}`}
                        className="flex items-start rounded-md bg-muted/50 p-2 text-sm">
                        <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                        <span>
                          {optimizationSuggestions[category][index].title ||
                            optimizationSuggestions[category][index]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
