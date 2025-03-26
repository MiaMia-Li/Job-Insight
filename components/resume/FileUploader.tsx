// components/resume/FileUploader.tsx
"use client";

import { motion } from "framer-motion";
import { Upload, FileText, ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FileUploaderProps {
  isDragging: boolean;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function FileUploader({
  isDragging,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleFileChange,
  fileInputRef,
}: FileUploaderProps) {
  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-2 border-dashed border-muted-foreground/25 bg-background/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <div
            className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center ${
              isDragging
                ? "bg-primary/5 border-primary/50"
                : "hover:bg-muted/50"
            } transition-colors duration-200 rounded-lg cursor-pointer`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={triggerFileInput}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />

            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: isDragging ? 1.05 : 1,
                y: isDragging ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                {isDragging ? (
                  <ArrowUpFromLine className="h-10 w-10 text-primary" />
                ) : (
                  <Upload className="h-10 w-10 text-primary" />
                )}
              </div>
            </motion.div>

            <h3 className="text-xl font-semibold mb-2">
              {isDragging ? "Drop your file here" : "Upload your resume"}
            </h3>

            <p className="text-muted-foreground mb-6 max-w-md">
              Drag and drop your resume file here, or click to browse. We
              support PDF, DOC, DOCX, and TXT formats.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Badge format="PDF" />
              <Badge format="DOC" />
              <Badge format="DOCX" />
              <Badge format="TXT" />
            </div>

            <Button
              variant="outline"
              className="mt-2 bg-background"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}>
              <FileText className="mr-2 h-4 w-4" />
              Browse files
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>
          Your file will be securely processed. We don&#39;t store your resume
          permanently.
        </p>
      </div>
    </div>
  );
}

// File format badge component
function Badge({ format }: { format: string }) {
  const getColor = (format: string) => {
    switch (format) {
      case "PDF":
        return "bg-red-100 text-red-700 border-red-200";
      case "DOC":
      case "DOCX":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "TXT":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div
      className={`px-3 py-1 rounded-full text-xs font-medium border ${getColor(
        format
      )}`}>
      {format}
    </div>
  );
}
