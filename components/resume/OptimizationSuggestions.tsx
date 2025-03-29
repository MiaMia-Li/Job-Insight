// src/components/resume/optimization/suggestions.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  RefreshCw,
  CheckCircle,
  FileText,
  Target,
  Layout,
  Check,
  Plus,
  ArrowRight,
  PenLine,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function OptimizationSuggestions({
  resumeData,
  optimizationSuggestions,
  acceptedSuggestions,
  toggleSuggestion,
  applyOptimization,
  resetOptimization,
  optimizationInProgress,
  optimizationApplied,
  customizeOptimization,
}) {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [preferences, setPreferences] = useState({
    focusOnATS: true,
    emphasizeSkills: true,
    quantifyAchievements: true,
    improveReadability: true,
    customFocus: "",
  });

  console.log("--acceptedSuggestions", acceptedSuggestions);

  // Calculate total accepted suggestions
  const totalAcceptedSuggestions =
    Object.values(acceptedSuggestions).flat().length;
  const totalSuggestions = Object.values(optimizationSuggestions).flat().length;

  // Handle customize form submission
  const handleCustomize = () => {
    customizeOptimization({
      jobDescription,
      targetRole,
      preferences,
    });
    setIsCustomizeOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              Optimization Suggestions
            </CardTitle>
            <CardDescription>
              Review and select the suggestions you want to apply
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCustomizeOpen(true)}
            disabled={optimizationApplied}>
            <PenLine className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
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
                {totalAcceptedSuggestions} of {totalSuggestions} suggestions
                selected
              </p>
            </div>
          </div>
          <Progress
            value={(totalAcceptedSuggestions / totalSuggestions) * 100}
            className="h-2 w-32"
          />
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            {optimizationSuggestions.content.map((suggestion, index) => (
              <SuggestionItem
                key={`content-${index}`}
                suggestion={suggestion}
                index={index}
                category="content"
                isAccepted={acceptedSuggestions.content.includes(index)}
                toggleSuggestion={toggleSuggestion}
                icon={<FileText className="h-4 w-4" />}
              />
            ))}
            {optimizationSuggestions.content.length === 0 && (
              <EmptySuggestions type="content" />
            )}
          </TabsContent>
          {optimizationSuggestions.keywords && (
            <TabsContent value="keywords" className="space-y-4">
              {optimizationSuggestions.keywords.map((suggestion, index) => (
                <SuggestionItem
                  key={`keywords-${index}`}
                  suggestion={suggestion}
                  index={index}
                  category="keywords"
                  isAccepted={acceptedSuggestions.keywords.includes(index)}
                  toggleSuggestion={toggleSuggestion}
                  icon={<Target className="h-4 w-4" />}
                  showKeywords={index === 0}
                />
              ))}
              {optimizationSuggestions.keywords.length === 0 && (
                <EmptySuggestions type="keywords" />
              )}
            </TabsContent>
          )}

          <TabsContent value="format" className="space-y-4">
            {optimizationSuggestions.format.map((suggestion, index) => (
              <SuggestionItem
                key={`format-${index}`}
                suggestion={suggestion}
                index={index}
                category="format"
                isAccepted={acceptedSuggestions.format.includes(index)}
                toggleSuggestion={toggleSuggestion}
                icon={<Layout className="h-4 w-4" />}
              />
            ))}
            {optimizationSuggestions.format.length === 0 && (
              <EmptySuggestions type="format" />
            )}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            {optimizationSuggestions.custom.map((suggestion, index) => (
              <SuggestionItem
                key={`custom-${index}`}
                suggestion={suggestion}
                index={index}
                category="custom"
                isAccepted={acceptedSuggestions.custom.includes(index)}
                toggleSuggestion={toggleSuggestion}
                icon={<Zap className="h-4 w-4" />}
              />
            ))}
            {optimizationSuggestions.custom.length === 0 && (
              <EmptySuggestions type="custom" />
            )}
          </TabsContent>
        </Tabs>

        {/* Customize Dialog */}
        <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Customize Optimization</DialogTitle>
              <DialogDescription>
                Tailor the optimization to your specific needs and target job
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Job Title</Label>
                <Input
                  id="targetRole"
                  placeholder="e.g., Senior Software Engineer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">
                  Job Description (Optional)
                </Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here to optimize your resume for this specific role"
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Adding a job description helps our AI tailor suggestions
                  specifically for this role
                </p>
              </div>

              <div className="space-y-3 mt-2">
                <Label>Optimization Preferences</Label>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ats" className="text-sm">
                      Focus on ATS compatibility
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Optimize for applicant tracking systems
                    </p>
                  </div>
                  <Switch
                    id="ats"
                    checked={preferences.focusOnATS}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        focusOnATS: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="skills" className="text-sm">
                      Emphasize skills
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Highlight relevant skills for the role
                    </p>
                  </div>
                  <Switch
                    id="skills"
                    checked={preferences.emphasizeSkills}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        emphasizeSkills: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="achievements" className="text-sm">
                      Quantify achievements
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Add metrics and numbers to your accomplishments
                    </p>
                  </div>
                  <Switch
                    id="achievements"
                    checked={preferences.quantifyAchievements}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        quantifyAchievements: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="readability" className="text-sm">
                      Improve readability
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Enhance formatting and structure
                    </p>
                  </div>
                  <Switch
                    id="readability"
                    checked={preferences.improveReadability}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        improveReadability: checked,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2 mt-2">
                  <Label htmlFor="customFocus" className="text-sm">
                    Custom Focus (Optional)
                  </Label>
                  <Input
                    id="customFocus"
                    placeholder="e.g., Leadership skills, Technical expertise"
                    value={preferences.customFocus}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        customFocus: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCustomizeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCustomize}>
                Generate Tailored Suggestions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
  );
}

// Suggestion Item Component
function SuggestionItem({
  suggestion,
  index,
  category,
  isAccepted,
  toggleSuggestion,
  icon,
  showKeywords = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex items-start justify-between rounded-lg border p-4 transition-colors ${
        isAccepted
          ? "border-green-500/50 bg-green-50 dark:border-green-500/30 dark:bg-green-900/10"
          : "border-border"
      }`}>
      <div className="flex items-start space-x-3">
        <div
          className={`mt-0.5 rounded-full p-1 ${
            isAccepted
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : "bg-muted text-muted-foreground"
          }`}>
          {icon}
        </div>
        <div>
          <p className="font-medium text-foreground">
            {suggestion.title || suggestion}
          </p>
          {suggestion.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {suggestion.description}
            </p>
          )}

          {/* Example Dialog */}
          {suggestion.example && (
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
                  <DialogTitle>Before & After Example</DialogTitle>
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
                      {suggestion.example.before}
                    </p>
                  </div>
                  <div className="rounded-lg border border-green-500/30 bg-green-50 p-4 dark:bg-green-900/10">
                    <h4 className="mb-2 text-sm font-medium text-green-600 dark:text-green-400">
                      After
                    </h4>
                    <p className="text-sm text-foreground">
                      {suggestion.example.after}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Keyword Badges */}
          {showKeywords && suggestion.keywords && (
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestion.keywords.map((keyword, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className={
                    keyword.found
                      ? "bg-green-100/50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-muted/50"
                  }>
                  {keyword.text} {keyword.found ? `(${keyword.count})` : "(0)"}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full ${
            isAccepted
              ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => toggleSuggestion(category, index)}>
          {isAccepted ? (
            <Check className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.div>
  );
}

// Empty Suggestions Component
function EmptySuggestions({ type }) {
  const typeLabels = {
    content: "content improvements",
    keywords: "keyword optimizations",
    format: "formatting suggestions",
    custom: "custom suggestions",
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="rounded-full bg-muted p-3">
        <Sparkles className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-medium">No {typeLabels[type]} available</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Try customizing your optimization preferences or adding a job
        description to get tailored suggestions.
      </p>
    </div>
  );
}
