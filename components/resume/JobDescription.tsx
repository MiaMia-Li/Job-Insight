// components/resume/JobDescription.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  PenTool,
  Building,
  MapPin,
  ClipboardPaste,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";

interface JobDescriptionProps {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

const JobDescription = ({
  jobTitle,
  setJobTitle,
  company,
  setCompany,
  location,
  setLocation,
  description,
  setDescription,
}: JobDescriptionProps) => {
  const [pasteSuccess, setPasteSuccess] = useState<boolean | null>(null);
  const [showTips, setShowTips] = useState(true);

  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setDescription(text);
        setPasteSuccess(true);

        // Reset success message after 3 seconds
        setTimeout(() => {
          setPasteSuccess(null);
        }, 3000);
      }
    } catch (err) {
      setPasteSuccess(false);

      // Reset error message after 3 seconds
      setTimeout(() => {
        setPasteSuccess(null);
      }, 3000);
    }
  };

  // Clear all fields
  const handleClearAll = () => {
    setJobTitle("");
    setCompany("");
    setLocation("");
    setDescription("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full">
      <Card className="border-primary/10 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Add Job Description</h3>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePaste}
                  className="text-xs">
                  <ClipboardPaste className="h-3.5 w-3.5 mr-1" />
                  Paste
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-xs text-muted-foreground">
                  <X className="h-3.5 w-3.5 mr-1" />
                  Clear
                </Button>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground">
              Adding a job description helps us analyze how well your resume
              matches the position you&apos;re applying for.
            </motion.p>

            {/* Paste status message */}
            <AnimatePresence>
              {pasteSuccess !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}>
                  <Alert
                    variant={pasteSuccess ? "default" : "destructive"}
                    className="py-2">
                    <div className="flex items-center">
                      {pasteSuccess ? (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-2" />
                      )}
                      <AlertDescription>
                        {pasteSuccess
                          ? "Job description pasted successfully!"
                          : "Failed to access clipboard. Please paste manually."}
                      </AlertDescription>
                    </div>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              variants={itemVariants}
              className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <div className="relative">
                  <PenTool className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="jobTitle"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    placeholder="e.g. Acme Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g. Remote, New York, NY"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">Job Description</Label>
                  <span className="text-xs text-muted-foreground">
                    {description.length > 0
                      ? `${description.length} characters`
                      : ""}
                  </span>
                </div>
                <Textarea
                  id="description"
                  placeholder="Paste the job description here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>
            </motion.div>

            {/* Tips section */}
            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-muted/50 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium mb-2">
                      Tips for better matching:
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mt-1 -mr-1"
                      onClick={() => setShowTips(false)}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Include the full job description for best results</li>
                    <li>
                      • Make sure to include required skills and qualifications
                    </li>
                    <li>• Add company information for better context</li>
                    <li>
                      • The more detailed the description, the better the
                      analysis
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobDescription;
