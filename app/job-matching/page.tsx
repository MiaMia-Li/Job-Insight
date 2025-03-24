"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import JobCard from "../../components/job-card";
import CompareModal from "../../components/compare-modal";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  skills: string[];
}

export default async function JobMatching() {
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const fetchJobs = async () => {
    try {
      const data = await fetch(
        "/api/getJobs?keyword=frontend%20developer&location=India&limit=5",
        {
          method: "GET",
        }
      );
      const posts = await data.json();
      console.log("posy---", posts);
    } catch (error) {
      console.log("error---", error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">
        Job Matching & Recommendations
      </h1>

      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="matches">Best Matches</TabsTrigger>
          <TabsTrigger value="similar">Similar Positions</TabsTrigger>
          <TabsTrigger value="companies">Recommended Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Job cards with match scores */}
            <JobCard
              matchScore={95}
              title="Senior Frontend Developer"
              company="Tech Corp"
              onCompare={(job) => {
                setSelectedJobs([...selectedJobs, job]);
              }}
            />
            <JobCard
              matchScore={95}
              title="Senior Frontend Developer"
              company="Tech Corp"
              onCompare={(job) => {
                setSelectedJobs([...selectedJobs, job]);
              }}
            />
            {/* More job cards... */}
          </div>
        </TabsContent>

        {/* Similar positions tab */}
        <TabsContent value="similar">
          {/* Similar content structure */}
        </TabsContent>

        {/* Companies tab */}
        <TabsContent value="companies">{/* Companies content */}</TabsContent>
      </Tabs>

      {/* Job alerts subscription */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Job Alerts</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter job keywords..."
            className="flex-1 p-2 border rounded-md dark:bg-gray-800"
          />
          <Button>Subscribe</Button>
        </div>
      </Card>

      {/* Compare modal */}
      <CompareModal
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        jobs={selectedJobs}
      />

      {/* Compare floating button */}
      {selectedJobs.length > 0 && (
        <Button
          className="fixed bottom-4 right-4"
          onClick={() => setShowCompare(true)}>
          Compare ({selectedJobs.length})
        </Button>
      )}
    </div>
  );
}
