import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { X, Building2, MapPin, DollarSign } from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  skills: string[];
}

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
}

export default function CompareModal({
  isOpen,
  onClose,
  jobs,
}: CompareModalProps) {
  const compareItems = [
    { label: "Match Score", key: "matchScore" },
    { label: "Company", key: "company" },
    { label: "Location", key: "location" },
    { label: "Salary", key: "salary" },
    { label: "Skills", key: "skills" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] w-full">
        <DialogHeader>
          <DialogTitle>Compare Jobs</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          {/* Job Titles Row */}
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
            <div className="font-semibold">Position</div>
            {jobs.map((job, index) => (
              <div key={index} className="relative">
                <h3 className="font-semibold">{job.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-2 -top-2"
                  onClick={() => {
                    const newJobs = [...jobs];
                    newJobs.splice(index, 1);
                    // 需要在父组件中实现更新jobs的逻辑
                  }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          {compareItems.map((item) => (
            <div
              key={item.key}
              className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-4 items-center">
              <div className="font-semibold">{item.label}</div>
              {jobs.map((job, index) => (
                <div key={index}>
                  {item.key === "matchScore" && (
                    <Badge
                      variant={job.matchScore >= 90 ? "default" : "secondary"}
                      className="text-sm">
                      {job.matchScore}% Match
                    </Badge>
                  )}

                  {item.key === "company" && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                  )}

                  {item.key === "location" && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  )}

                  {item.key === "salary" && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}

                  {item.key === "skills" && (
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
