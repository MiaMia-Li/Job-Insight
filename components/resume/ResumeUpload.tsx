// components/ResumeUploader.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  FileCode,
  FolderOpen,
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import PDF from "/public/PDF.svg";
import DOC from "/public/DOC.svg";
import TXT from "/public/TXT.svg";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/providers/auth-context";

interface FileInfo {
  id?: string;
  originalName: string;
  path: string;
  mimetype: string;
  size: number;
  extension?: string;
  isPublic?: boolean;
  uploadedAt?: string;
}

interface ResumeUploaderProps {
  onContinue: (file: File) => void;
}

export default function ResumeUploader({ onContinue }: ResumeUploaderProps) {
  const { requireAuth } = useAuth();

  // State management
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userFiles, setUserFiles] = useState<FileInfo[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExistingFile, setSelectedExistingFile] =
    useState<FileInfo | null>(null);
  const [showTips, setShowTips] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Fetch user's previously uploaded files
  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await fetch("/api/files?limit=50");
        if (response.ok) {
          const data = await response.json();
          setUserFiles(data.files || []);
        }
      } catch (error) {
        console.error("Error fetching user files:", error);
      }
    };

    fetchUserFiles();
  }, [requireAuth]);

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
    setSelectedExistingFile(null);
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
      setUploadStatus(false);
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }

    setFile(selectedFile);
    setProcessingStage("uploading");
    setUploadProgress(0);
    setSelectedExistingFile(null);

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
      setUploadStatus(true);
      setTimeout(() => setUploadStatus(null), 3000);

      if (data[0].url) {
        const fileInfo: FileInfo = {
          originalName: selectedFile.name,
          path: data[0].url,
          mimetype: selectedFile.type,
          size: selectedFile.size,
          extension: selectedFile.name.split(".").pop(),
        };

        const saveResponse = await fetch("/api/files", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fileInfo),
        });

        if (saveResponse.ok) {
          const savedData = await saveResponse.json();
          // Update fileInfo with database ID
          fileInfo.id = savedData.file.id;
        }
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error("Upload failed");
      setProcessingStage(null);
      setUploadProgress(0);
      setUploadStatus(false);
      setTimeout(() => setUploadStatus(null), 3000);
      return null;
    }
  };

  const handleSelectExistingFile = (fileInfo: FileInfo) => {
    setSelectedExistingFile(fileInfo);
    setFile(null);
    setProcessingStage("complete");
    setUploadProgress(100);
    setIsDialogOpen(false);
    setUploadStatus(true);
    setTimeout(() => setUploadStatus(null), 3000);
  };

  const handleContinue = async () => {
    try {
      if (file) {
        // 如果有直接上传的文件，直接使用它
        onContinue(file);
      } else if (selectedExistingFile) {
        // 如果是选择的现有文件，先转换为File对象
        setIsLoading(true); // 假设您有一个加载状态
        const response = await fetch(
          `/api/files/${selectedExistingFile.id}/content`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Failed to fetch file: ${response.statusText} (${response.status})`
          );
        }

        const blob = await response.blob();
        const fileObject = new File([blob], selectedExistingFile.originalName, {
          type: selectedExistingFile.mimetype || "application/octet-stream",
        });

        onContinue(fileObject);
        onContinue(fileObject);
      }
    } catch (error) {
      console.error("Error preparing file:", error);
      toast("Error preparing file");
    } finally {
      setIsLoading(false); // 结束加载状态
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType?.includes("doc"))
      return <Image src={DOC} width={36} height={36} alt={fileType} />;
    if (fileType?.includes("text"))
      return <Image src={TXT} width={36} height={36} alt={fileType} />;
    if (fileType?.includes("pdf"))
      return <Image src={PDF} width={36} height={36} alt={fileType} />;

    return <FileCode className="w-7 h-7" />;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileCode className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Upload Resume</h3>
              </div>

              {(file || selectedExistingFile) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-xs text-muted-foreground">
                  <X className="h-3.5 w-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground">
              Upload your resume to analyze how well it matches with job
              descriptions and get personalized improvement suggestions.
            </motion.p>

            {/* Upload status message */}
            <AnimatePresence>
              {uploadStatus !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}>
                  <Alert
                    variant={uploadStatus ? "default" : "destructive"}
                    className="py-2">
                    <div className="flex items-center">
                      {uploadStatus ? (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-2" />
                      )}
                      <AlertDescription>
                        {uploadStatus
                          ? "Resume uploaded successfully!"
                          : "Failed to upload resume. Please try again."}
                      </AlertDescription>
                    </div>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              {!file && !selectedExistingFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/20"
                  }`}
                  onDrop={() => requireAuth(() => handleDrop)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}>
                  <div className="flex flex-col items-center justify-center space-y-4 py-6">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">Drag and drop your resume</p>
                      <p className="text-sm text-muted-foreground">
                        or select an option below
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          requireAuth(() => fileInputRef.current?.click())
                        }>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload file
                      </Button>

                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={(value) =>
                          requireAuth(() => setIsDialogOpen(value))
                        }>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            <FolderOpen className="mr-2 h-4 w-4" />
                            Select existing
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Your Resumes</DialogTitle>
                          </DialogHeader>
                          <div className="max-h-[400px] overflow-y-auto mt-4">
                            {userFiles.length === 0 ? (
                              <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                                <FolderOpen className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                                <p className="font-medium">No files found</p>
                                <p className="text-sm mt-1">
                                  Upload a resume first to see it here
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {userFiles.map((fileInfo) => (
                                  <Card
                                    key={fileInfo.id}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() =>
                                      handleSelectExistingFile(fileInfo)
                                    }>
                                    <CardContent className="p-3 flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        {getFileIcon(fileInfo.mimetype)}
                                        <div>
                                          <p className="font-medium truncate max-w-[200px] sm:max-w-sm">
                                            {fileInfo.originalName}
                                          </p>
                                          <div className="flex space-x-2 text-xs text-muted-foreground">
                                            <span>
                                              {formatFileSize(fileInfo.size)}
                                            </span>
                                            {fileInfo.uploadedAt && (
                                              <span>
                                                •{" "}
                                                {formatDate(
                                                  fileInfo.uploadedAt
                                                )}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <Button size="sm" variant="ghost">
                                        Select
                                      </Button>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX, TXT
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-5">
                  <div className="flex items-center space-x-4">
                    {file ? (
                      getFileIcon(file.type)
                    ) : selectedExistingFile ? (
                      getFileIcon(selectedExistingFile.mimetype)
                    ) : (
                      <FileCode className="w-7 h-7" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium truncate max-w-[200px] sm:max-w-sm">
                        {file ? file.name : selectedExistingFile?.originalName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(
                          file ? file.size : selectedExistingFile?.size || 0
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Processing status - only show for new uploads */}
                  {file && processingStage && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          {processingStage === "uploading"
                            ? "Uploading..."
                            : processingStage === "analyzing"
                            ? "Analyzing resume..."
                            : processingStage === "complete"
                            ? "Upload complete"
                            : "Processing..."}
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
                    </div>
                  )}
                </div>
              )}
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
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Info className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Resume tips:
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
                    <li>
                      • PDF format is recommended for best parsing results
                    </li>
                    <li>• Make sure your contact information is up to date</li>
                    <li>
                      • Include relevant skills that match the job description
                    </li>
                    <li>• Keep your resume concise and well-structured</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue button */}
            {((file && uploadProgress === 100) || selectedExistingFile) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-end mt-6">
                <Button onClick={handleContinue} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      Continue to Job Description
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
