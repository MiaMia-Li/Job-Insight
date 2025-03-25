// components/ResumeUploader.tsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import FileUploader from "./FileUploader";
import PDF from "/public/PDF.svg";
import DOC from "/public/DOC.svg";
import TXT from "/public/TXT.svg";
import Image from "next/image";

interface ResumeUploaderProps {
  onUploadComplete: (fileUrl: string) => void;
  onContinue: () => void;
}

export default function ResumeUploader({
  onUploadComplete,
  onContinue,
}: ResumeUploaderProps) {
  // State management
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File handling functions
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProcessingStage(null);
    setUploadProgress(0);
    setFileUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = async (selectedFile: File) => {
    // Check file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type");
      return;
    }

    setFile(selectedFile);
    setProcessingStage("uploading");
    setUploadProgress(0);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Track upload progress
      const uploadProgressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(uploadProgressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 200);

      // Upload file to API
      const response = await fetch("/api/files/upload", {
        method: "PUT",
        body: formData,
      });

      clearInterval(uploadProgressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file");
      }

      const data = await response.json();

      // Update progress to 100% when complete
      setUploadProgress(100);
      setProcessingStage("complete");

      // Store the file URL returned from the API
      if (data[0].url) {
        setFileUrl(data[0].url);
        // Notify parent component about successful upload
        onUploadComplete(data[0].url);
      }

      return data;
    } catch (error: any) {
      console.error("Error uploading file:", error);

      toast.error("Upload failed");

      setProcessingStage(null);
      setUploadProgress(0);
      return null;
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType?.includes("doc"))
      return <Image src={DOC} width={30} height={30} alt={fileType} />;
    if (fileType?.includes("text"))
      return <Image src={TXT} width={30} height={30} alt={fileType} />;
    if (fileType?.includes("pdf"))
      return <Image src={PDF} width={30} height={30} alt={fileType} />;

    return <FileCode className="w-5 h-5" />;
  };

  // Format file size
  const formatFileSize = (bytes: any) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <>
      {!file ? (
        <FileUploader
          isDragging={isDragging}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
        />
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getFileIcon(file.type)}
                <div>
                  <p className="font-medium truncate max-w-[200px] sm:max-w-sm">
                    {file.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-muted-foreground hover:text-destructive">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Processing status */}
            {processingStage && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {processingStage === "uploading"
                      ? "Uploading..."
                      : processingStage === "analyzing"
                      ? "Analyzing resume..."
                      : processingStage === "complete"
                      ? "Upload complete"
                      : "Calculating score..."}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}></div>
                </div>

                {uploadProgress === 100 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-end mt-4">
                    <Button onClick={onContinue}>
                      Continue to Job Description
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
