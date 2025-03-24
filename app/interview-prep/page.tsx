"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Card } from "../../components/ui/card";
import InterviewQuestions from "../../components/interview-questions";
import MockInterview from "../../components/mock-interview";
import InterviewReport from "../../components/interview-report";

export default function InterviewPrep() {
  const [currentStep, setCurrentStep] = useState<
    "questions" | "mock" | "report"
  >("questions");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [interviewResponses, setInterviewResponses] = useState<
    Array<{ question: string; answer: string }>
  >([]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation</h1>

      {currentStep === "questions" && (
        <Tabs defaultValue="technical" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="technical">Technical Questions</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="technical">
            <InterviewQuestions
              type="technical"
              onQuestionsSelected={(questions) => {
                setSelectedQuestions(questions);
                setCurrentStep("mock");
              }}
            />
          </TabsContent>

          <TabsContent value="behavioral">
            <InterviewQuestions
              type="behavioral"
              onQuestionsSelected={(questions) => {
                setSelectedQuestions(questions);
                setCurrentStep("mock");
              }}
            />
          </TabsContent>
        </Tabs>
      )}

      {currentStep === "mock" && (
        <MockInterview
          questions={selectedQuestions}
          onComplete={(responses) => {
            setInterviewResponses(responses);
            setCurrentStep("report");
          }}
        />
      )}

      {currentStep === "report" && (
        <InterviewReport
          responses={interviewResponses}
          onStartNew={() => {
            setCurrentStep("questions");
            setSelectedQuestions([]);
            setInterviewResponses([]);
          }}
        />
      )}
    </div>
  );
}
