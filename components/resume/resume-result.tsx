// "use client";

import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { resumeData } from "../../lib/test";

interface ResumeData {
  score: number;
  scoreCategories: Array<{
    name: string;
    score: number;
  }>;
  sections: Array<{
    id: string;
    name: string;
    suggestions: Array<{
      title: string;
      description: string;
      priority: string;
    }>;
  }>;
  basicInfo: {
    name: string;
    email: string;
    phone: string;
    education: string;
    summary?: string;
  };
  workExperience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
    achievements?: string[];
  }>;
  skills: string[];
}

export default function ResumeResult({ data }: { data?: ResumeData }) {
  console.log("--data", data);
  return (
    <div className="space-y-8">
      {/* Basic Information Card */}
      {/* <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">
          Basic Informatio
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-x-2">
            <span className="font-medium text-muted-foreground">Name:</span>
            <span className="text-foreground">{data.basicInfo.name}</span>
          </div>
          <div className="space-x-2">
            <span className="font-medium text-muted-foreground">Email:</span>
            <span className="text-foreground">{data.basicInfo.email}</span>
          </div>
          <div className="space-x-2">
            <span className="font-medium text-muted-foreground">Phone:</span>
            <span className="text-foreground">{data.basicInfo.phone}</span>
          </div>
          <div className="space-x-2">
            <span className="font-medium text-muted-foreground">
              Education:
            </span>
            <span className="text-foreground">{data.basicInfo.education}</span>
          </div>
        </div>
        {data.basicInfo.summary && (
          <div className="mt-4 space-x-2">
            <span className="font-medium text-muted-foreground">Summary:</span>
            <p className="text-foreground/80">{data.basicInfo.summary}</p>
          </div>
        )}
      </Card> */}

      {/* Score Dashboard */}
      <section className="mb-12">
        <Card className="p-6">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-6 text-center md:mb-0 md:text-left">
              <h2 className="text-2xl font-bold text-foreground">
                Resume Score
              </h2>
              <p className="text-muted-foreground">
                Based on content, structure, and keywords
              </p>
            </div>
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-8 border-primary/20 bg-card">
              <span className="text-3xl font-bold text-foreground">
                {data?.score}
              </span>
              <span className="text-sm text-muted-foreground">out of 100</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {data.scoreCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {category.score}%
                  </span>
                </div>
                <Progress value={category.score} className="bg-secondary" />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Improvement Suggestions */}
      <section>
        <Tabs defaultValue="skills">
          <TabsList className="mb-4">
            {data.sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.sections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card>
                <div className="divide-y">
                  {section.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{suggestion.title}</p>
                        <p className="text-sm text-gray-500">
                          {suggestion.description}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Fix Now <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
