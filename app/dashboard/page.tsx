"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Clock,
  Star,
  ChevronRight,
  Plus,
  FolderPlus,
  Settings,
  Download,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Tag,
  Filter,
  Search,
  Crown,
  BarChart2,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for demonstration
const mockResumes = [
  {
    id: "1",
    title: "Software Engineer Resume",
    fileName: "john_doe_software_engineer.pdf",
    uploadDate: "2025-03-15T10:30:00Z",
    lastModified: "2025-03-20T14:45:00Z",
    currentScore: 87,
    initialScore: 64,
    folder: "Tech Jobs",
    tags: ["Software", "Frontend", "React"],
    optimizationHistory: [
      {
        date: "2025-03-15T14:30:00Z",
        score: 64,
        changes: [
          "Initial upload and analysis",
          "Identified 8 improvement areas",
        ],
      },
      {
        date: "2025-03-18T09:15:00Z",
        score: 72,
        changes: [
          "Improved skills section",
          "Enhanced job descriptions",
          "Added quantifiable achievements",
        ],
      },
      {
        date: "2025-03-20T14:45:00Z",
        score: 87,
        changes: [
          "Optimized for ATS keywords",
          "Refined professional summary",
          "Improved formatting and layout",
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Product Manager Resume",
    fileName: "john_doe_product_manager.pdf",
    uploadDate: "2025-03-10T08:20:00Z",
    lastModified: "2025-03-22T11:30:00Z",
    currentScore: 92,
    initialScore: 71,
    folder: "Management",
    tags: ["Product", "Leadership", "Agile"],
    optimizationHistory: [
      {
        date: "2025-03-10T08:20:00Z",
        score: 71,
        changes: [
          "Initial upload and analysis",
          "Identified 6 improvement areas",
        ],
      },
      {
        date: "2025-03-12T16:40:00Z",
        score: 83,
        changes: [
          "Enhanced product launch descriptions",
          "Added metrics and KPIs",
          "Improved leadership examples",
        ],
      },
      {
        date: "2025-03-22T11:30:00Z",
        score: 92,
        changes: [
          "Optimized for ATS keywords",
          "Added stakeholder management achievements",
          "Refined executive summary",
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Marketing Specialist Resume",
    fileName: "john_doe_marketing.pdf",
    uploadDate: "2025-02-28T13:15:00Z",
    lastModified: "2025-03-05T10:20:00Z",
    currentScore: 79,
    initialScore: 58,
    folder: "Marketing",
    tags: ["Digital", "Social Media", "Content"],
    optimizationHistory: [
      {
        date: "2025-02-28T13:15:00Z",
        score: 58,
        changes: [
          "Initial upload and analysis",
          "Identified 9 improvement areas",
        ],
      },
      {
        date: "2025-03-02T15:30:00Z",
        score: 67,
        changes: [
          "Added campaign metrics",
          "Enhanced social media achievements",
          "Improved content strategy descriptions",
        ],
      },
      {
        date: "2025-03-05T10:20:00Z",
        score: 79,
        changes: [
          "Optimized for marketing keywords",
          "Added ROI metrics",
          "Improved overall structure",
        ],
      },
    ],
  },
];

const folders = [
  "All Resumes",
  "Tech Jobs",
  "Management",
  "Marketing",
  "Other",
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("resumes");
  const [selectedResume, setSelectedResume] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All Resumes");
  const [sortBy, setSortBy] = useState("lastModified");
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [resumes, setResumes] = useState(mockResumes);
  const [isOptimizationHistoryOpen, setIsOptimizationHistoryOpen] =
    useState(false);
  const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  // Check if user is authenticated
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);

  // Filter resumes based on search query and selected folder
  const filteredResumes = resumes.filter((resume) => {
    const matchesSearch = resume.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFolder =
      selectedFolder === "All Resumes" || resume.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  // Sort resumes
  const sortedResumes = [...filteredResumes].sort((a, b) => {
    if (sortBy === "lastModified") {
      return new Date(b.lastModified) - new Date(a.lastModified);
    } else if (sortBy === "score") {
      return b.currentScore - a.currentScore;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days since last modification
  const getDaysSinceModified = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Handle creating a new folder
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // In a real app, you would save this to the database
      setNewFolderName("");
      setIsCreateFolderOpen(false);
      // For demo purposes, we'll just add it to the folders array
      folders.push(newFolderName);
    }
  };

  // Handle creating a new tag
  const handleCreateTag = (resumeId) => {
    if (newTagName.trim()) {
      // In a real app, you would save this to the database
      const updatedResumes = resumes.map((resume) => {
        if (resume.id === resumeId) {
          return {
            ...resume,
            tags: [...resume.tags, newTagName],
          };
        }
        return resume;
      });
      setResumes(updatedResumes);
      setNewTagName("");
      setIsCreateTagOpen(false);
    }
  };

  // Handle deleting a resume
  const handleDeleteResume = (id) => {
    const updatedResumes = resumes.filter((resume) => resume.id !== id);
    setResumes(updatedResumes);
  };

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };

  // Get score background color based on value
  const getScoreBgColor = (score) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  // Get improvement percentage
  const getImprovementPercentage = (current, initial) => {
    return Math.round(((current - initial) / initial) * 100);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your resumes and track your optimization progress
            </p>
          </div>
          <Button
            onClick={() => router.push("/upload")}
            className="flex items-center gap-2">
            <Plus size={16} />
            <span>Upload New Resume</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs
                  defaultValue="resumes"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="resumes" className="flex-1">
                      Resumes
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1">
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {activeTab === "resumes" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Folders</h3>
                      <ul className="space-y-1">
                        {folders.map((folder) => (
                          <li key={folder}>
                            <Button
                              variant={
                                selectedFolder === folder
                                  ? "secondary"
                                  : "ghost"
                              }
                              className="w-full justify-start text-left"
                              onClick={() => setSelectedFolder(folder)}>
                              {folder === "All Resumes" ? (
                                <FileText size={16} className="mr-2" />
                              ) : (
                                <FolderPlus size={16} className="mr-2" />
                              )}
                              {folder}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Dialog
                      open={isCreateFolderOpen}
                      onOpenChange={setIsCreateFolderOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center gap-2">
                          <Plus size={16} />
                          <span>Create Folder</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Folder</DialogTitle>
                          <DialogDescription>
                            Enter a name for your new folder to organize your
                            resumes.
                          </DialogDescription>
                        </DialogHeader>
                        <Input
                          placeholder="Folder name"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          className="mt-4"
                        />
                        <DialogFooter className="mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsCreateFolderOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateFolder}>Create</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-2">Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm flex items-center">
                            <FileText size={14} className="mr-2" />
                            Total Resumes
                          </span>
                          <span className="font-medium">{resumes.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm flex items-center">
                            <BarChart2 size={14} className="mr-2" />
                            Average Score
                          </span>
                          <span className="font-medium">
                            {Math.round(
                              resumes.reduce(
                                (acc, resume) => acc + resume.currentScore,
                                0
                              ) / resumes.length
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm flex items-center">
                            <Calendar size={14} className="mr-2" />
                            Last Upload
                          </span>
                          <span className="font-medium">
                            {formatDate(
                              [...resumes].sort(
                                (a, b) =>
                                  new Date(b.uploadDate) -
                                  new Date(a.uploadDate)
                              )[0].uploadDate
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Crown className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Premium Features</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            Unlock advanced optimization tools and unlimited
                            resume storage.
                          </p>
                          <Button className="w-full" variant="default">
                            Upgrade Now
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left">
                      <Settings size={16} className="mr-2" />
                      Account Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left">
                      <Crown size={16} className="mr-2" />
                      Subscription
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left">
                      <AlertCircle size={16} className="mr-2" />
                      Help & Support
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "resumes" && (
                <motion.div
                  key="resumes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}>
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle>
                          {selectedFolder === "All Resumes"
                            ? "All Resumes"
                            : selectedFolder}
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search resumes..."
                              className="pl-9 w-full sm:w-[200px]"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                              <div className="flex items-center gap-2">
                                <Filter size={16} />
                                <SelectValue placeholder="Sort by" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lastModified">
                                Last Modified
                              </SelectItem>
                              <SelectItem value="score">Score</SelectItem>
                              <SelectItem value="title">Title</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {sortedResumes.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            No resumes found
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            {searchQuery
                              ? "Try a different search term or clear your filters."
                              : "Upload your first resume to get started."}
                          </p>
                          <Button
                            onClick={() => router.push("/upload")}
                            className="flex items-center gap-2 mx-auto">
                            <Plus size={16} />
                            <span>Upload New Resume</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {sortedResumes.map((resume) => (
                            <motion.div
                              key={resume.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}>
                              <Card className="overflow-hidden border-border/50 hover:border-border transition-all duration-200">
                                <div className="flex flex-col md:flex-row">
                                  <div className="flex-grow p-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`flex items-center justify-center w-10 h-10 rounded-full ${getScoreBgColor(
                                            resume.currentScore
                                          )}`}>
                                          <span className="text-white font-medium">
                                            {resume.currentScore}
                                          </span>
                                        </div>
                                        <div>
                                          <h3 className="font-medium text-lg">
                                            {resume.title}
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                            {resume.fileName}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                          {resume.folder}
                                        </Badge>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Badge
                                                variant="secondary"
                                                className="cursor-help">
                                                +
                                                {getImprovementPercentage(
                                                  resume.currentScore,
                                                  resume.initialScore
                                                )}
                                                %
                                              </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>
                                                Improved from{" "}
                                                {resume.initialScore}% to{" "}
                                                {resume.currentScore}%
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </div>

                                    <div className="mb-4">
                                      <div className="flex justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">
                                          Resume Score
                                        </span>
                                        <span
                                          className={getScoreColor(
                                            resume.currentScore
                                          )}>
                                          {resume.currentScore}%
                                        </span>
                                      </div>
                                      <Progress
                                        value={resume.currentScore}
                                        className="h-2"
                                      />
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {resume.tags.map((tag, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="bg-primary/5 hover:bg-primary/10">
                                          {tag}
                                        </Badge>
                                      ))}
                                      <Dialog
                                        open={isCreateTagOpen}
                                        onOpenChange={setIsCreateTagOpen}>
                                        <DialogTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 rounded-full">
                                            <Plus size={14} />
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>
                                              Add New Tag
                                            </DialogTitle>
                                            <DialogDescription>
                                              Enter a tag name to categorize
                                              your resume.
                                            </DialogDescription>
                                          </DialogHeader>
                                          <Input
                                            placeholder="Tag name"
                                            value={newTagName}
                                            onChange={(e) =>
                                              setNewTagName(e.target.value)
                                            }
                                            className="mt-4"
                                          />
                                          <DialogFooter className="mt-4">
                                            <Button
                                              variant="outline"
                                              onClick={() =>
                                                setIsCreateTagOpen(false)
                                              }>
                                              Cancel
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                handleCreateTag(resume.id)
                                              }>
                                              Add Tag
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </div>

                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <Clock size={14} className="mr-1" />
                                      <span>
                                        Last modified{" "}
                                        {getDaysSinceModified(
                                          resume.lastModified
                                        )}{" "}
                                        days ago
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex md:flex-col justify-between md:justify-center items-center gap-3 p-4 bg-muted/30 border-t md:border-t-0 md:border-l border-border/50">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full"
                                      onClick={() => {
                                        setSelectedResume(resume);
                                        setIsOptimizationHistoryOpen(true);
                                      }}>
                                      <BarChart2 size={14} className="mr-2" />
                                      History
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full">
                                      <Download size={14} className="mr-2" />
                                      Download
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="w-full">
                                          <span>More</span>
                                          <ChevronDown
                                            size={14}
                                            className="ml-2"
                                          />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() =>
                                            router.push(
                                              `/optimize/${resume.id}`
                                            )
                                          }>
                                          <CheckCircle
                                            size={14}
                                            className="mr-2"
                                          />
                                          <span>Optimize</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit size={14} className="mr-2" />
                                          <span>Rename</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Tag size={14} className="mr-2" />
                                          <span>Move to Folder</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          className="text-red-500 focus:text-red-500"
                                          onClick={() =>
                                            handleDeleteResume(resume.id)
                                          }>
                                          <Trash2 size={14} className="mr-2" />
                                          <span>Delete</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences and subscription
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="profile">
                        <TabsList className="mb-4">
                          <TabsTrigger value="profile">Profile</TabsTrigger>
                          <TabsTrigger value="subscription">
                            Subscription
                          </TabsTrigger>
                          <TabsTrigger value="notifications">
                            Notifications
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Personal Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Update your personal details
                            </p>
                          </div>

                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="name"
                                className="text-right text-sm font-medium">
                                Name
                              </label>
                              <Input
                                id="name"
                                defaultValue="John Doe"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="email"
                                className="text-right text-sm font-medium">
                                Email
                              </label>
                              <Input
                                id="email"
                                defaultValue="john.doe@example.com"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="phone"
                                className="text-right text-sm font-medium">
                                Phone
                              </label>
                              <Input
                                id="phone"
                                defaultValue="+1 (555) 123-4567"
                                className="col-span-3"
                              />
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Change Password
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Update your password to keep your account secure
                            </p>
                          </div>

                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="current-password"
                                className="text-right text-sm font-medium">
                                Current Password
                              </label>
                              <Input
                                id="current-password"
                                type="password"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="new-password"
                                className="text-right text-sm font-medium">
                                New Password
                              </label>
                              <Input
                                id="new-password"
                                type="password"
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label
                                htmlFor="confirm-password"
                                className="text-right text-sm font-medium">
                                Confirm Password
                              </label>
                              <Input
                                id="confirm-password"
                                type="password"
                                className="col-span-3"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button>Save Changes</Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="subscription" className="space-y-6">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Current Plan
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              You are currently on the Free plan
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-border/50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Free</CardTitle>
                                <CardDescription>
                                  Basic resume optimization
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pb-3">
                                <div className="text-3xl font-bold mb-4">
                                  $0
                                  <span className="text-sm font-normal text-muted-foreground">
                                    /month
                                  </span>
                                </div>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>3 resume uploads</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Basic ATS optimization</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Score analysis</span>
                                  </li>
                                </ul>
                              </CardContent>
                              <CardFooter>
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  disabled>
                                  Current Plan
                                </Button>
                              </CardFooter>
                            </Card>

                            <Card className="border-primary relative">
                              <div className="absolute top-0 right-4 -translate-y-1/2">
                                <Badge className="bg-primary hover:bg-primary">
                                  Popular
                                </Badge>
                              </div>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Pro</CardTitle>
                                <CardDescription>
                                  Advanced resume tools
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pb-3">
                                <div className="text-3xl font-bold mb-4">
                                  $9.99
                                  <span className="text-sm font-normal text-muted-foreground">
                                    /month
                                  </span>
                                </div>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Unlimited resume uploads</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Advanced ATS optimization</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Industry-specific suggestions</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Resume templates</span>
                                  </li>
                                </ul>
                              </CardContent>
                              <CardFooter>
                                <Button className="w-full">
                                  Upgrade to Pro
                                </Button>
                              </CardFooter>
                            </Card>

                            <Card className="border-border/50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg">
                                  Premium
                                </CardTitle>
                                <CardDescription>
                                  Complete career solution
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pb-3">
                                <div className="text-3xl font-bold mb-4">
                                  $19.99
                                  <span className="text-sm font-normal text-muted-foreground">
                                    /month
                                  </span>
                                </div>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Everything in Pro</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>Cover letter optimization</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>LinkedIn profile review</span>
                                  </li>
                                  <li className="flex items-center">
                                    <CheckCircle
                                      size={16}
                                      className="mr-2 text-green-500"
                                    />
                                    <span>1-on-1 career coaching</span>
                                  </li>
                                </ul>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" className="w-full">
                                  Upgrade to Premium
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent
                          value="notifications"
                          className="space-y-6">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Notification Preferences
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Manage how and when you receive notifications
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <h4 className="font-medium">
                                  Email Notifications
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about your account activity
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Enabled
                              </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <h4 className="font-medium">Resume Updates</h4>
                                <p className="text-sm text-muted-foreground">
                                  Get notified when your resume score changes
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Enabled
                              </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <h4 className="font-medium">
                                  Marketing Emails
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Receive tips, product updates and offers
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Disabled
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Optimization History Dialog */}
      <Dialog
        open={isOptimizationHistoryOpen}
        onOpenChange={setIsOptimizationHistoryOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Optimization History</DialogTitle>
            <DialogDescription>
              Track your resume&apos;s improvement over time
            </DialogDescription>
          </DialogHeader>

          {selectedResume && (
            <div className="space-y-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">
                    {selectedResume.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    First uploaded on {formatDate(selectedResume.uploadDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Initial Score
                    </p>
                    <div className="flex items-center gap-1">
                      <span
                        className={getScoreColor(selectedResume.initialScore)}>
                        {selectedResume.initialScore}%
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Current Score
                    </p>
                    <div className="flex items-center gap-1">
                      <span
                        className={getScoreColor(selectedResume.currentScore)}>
                        {selectedResume.currentScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-8 relative">
                  {selectedResume.optimizationHistory.map((history, index) => (
                    <div key={index} className="relative pl-10">
                      <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="font-medium">
                            {index === 0
                              ? "Initial Analysis"
                              : `Optimization Round ${index}`}
                          </h4>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">
                              Score: {history.score}%
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(history.date)}
                            </span>
                          </div>
                        </div>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4">
                            <h5 className="text-sm font-medium mb-2">
                              Changes Made:
                            </h5>
                            <ul className="space-y-1">
                              {history.changes.map((change, changeIndex) => (
                                <li
                                  key={changeIndex}
                                  className="text-sm flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{change}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOptimizationHistoryOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => router.push(`/optimize/${selectedResume.id}`)}>
                  Continue Optimizing
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
