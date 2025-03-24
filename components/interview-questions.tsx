import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface InterviewQuestionsProps {
  type: "technical" | "behavioral";
  onQuestionsSelected: (questions: string[]) => void;
}

const SAMPLE_QUESTIONS = {
  technical: [
    "Explain the difference between let, const, and var in JavaScript",
    "What is React's Virtual DOM and how does it work?",
    "Describe the concept of closures in JavaScript",
    // ... 更多技术问题
  ],
  behavioral: [
    "Tell me about a challenging project you worked on",
    "How do you handle conflicts in a team?",
    "Describe a situation where you had to learn a new technology quickly",
    // ... 更多行为问题
  ],
};

export default function InterviewQuestions({
  type,
  onQuestionsSelected,
}: InterviewQuestionsProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Select {type === "technical" ? "Technical" : "Behavioral"} Questions
      </h2>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {SAMPLE_QUESTIONS[type].map((question, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Checkbox
                id={`question-${index}`}
                checked={selectedQuestions.includes(question)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedQuestions([...selectedQuestions, question]);
                  } else {
                    setSelectedQuestions(
                      selectedQuestions.filter((q) => q !== question)
                    );
                  }
                }}
              />
              <label
                htmlFor={`question-${index}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {question}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => onQuestionsSelected(selectedQuestions)}
          disabled={selectedQuestions.length === 0}>
          Start Mock Interview
        </Button>
      </div>
    </Card>
  );
}
