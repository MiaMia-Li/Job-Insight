import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, MapPin, Building2, DollarSign, Plus } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location?: string;
  salary?: string;
  matchScore: number;
  skills?: string[];
  description?: string;
  onCompare?: (job: any) => void;
}

export default function JobCard({
  title,
  company,
  location = "Remote",
  salary = "$100k - $150k",
  matchScore,
  skills = ["React", "TypeScript", "Node.js"],
  description = "We are looking for an experienced developer to join our team...",
  onCompare,
}: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Match Score Badge */}
      <div className="flex justify-between items-start mb-4">
        <Badge
          variant={matchScore >= 90 ? "default" : "secondary"}
          className="text-sm">
          {matchScore}% Match
        </Badge>
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Job Title and Company */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Building2 className="h-4 w-4" />
        <span>{company}</span>
      </div>

      {/* Location and Salary */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span>{salary}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <Button className="flex-1">Apply Now</Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onCompare &&
            onCompare({
              title,
              company,
              location,
              salary,
              matchScore,
              skills,
            })
          }>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
