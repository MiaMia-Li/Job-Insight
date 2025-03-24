import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Mic, MicOff, ArrowRight } from "lucide-react";

interface MockInterviewProps {
  questions: string[];
  onComplete: (responses: Array<{ question: string; answer: string }>) => void;
}

export default function MockInterview({
  questions,
  onComplete,
}: MockInterviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [responses, setResponses] = useState<
    Array<{ question: string; answer: string }>
  >([]);

  const handleNext = () => {
    const newResponses = [
      ...responses,
      {
        question: questions[currentQuestionIndex],
        answer: currentAnswer,
      },
    ];

    if (currentQuestionIndex === questions.length - 1) {
      onComplete(newResponses);
    } else {
      setResponses(newResponses);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="text-lg">{questions[currentQuestionIndex]}</p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Type your answer here..."
          className="min-h-[200px]"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setIsRecording(!isRecording)}
            className="flex items-center gap-2">
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!currentAnswer.trim()}
            className="flex items-center gap-2">
            {currentQuestionIndex === questions.length - 1
              ? "Complete"
              : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
