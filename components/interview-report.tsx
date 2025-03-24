import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface InterviewReportProps {
  responses: Array<{ question: string; answer: string }>;
  onStartNew: () => void;
}

export default function InterviewReport({
  responses,
  onStartNew,
}: InterviewReportProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Interview Performance Report</h2>

      <div className="space-y-6">
        {/* Overall Score */}
        <div className="p-4 bg-primary/10 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Overall Performance</h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">
              Great performance! Some areas for improvement noted below.
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <Accordion type="single" collapsible className="w-full">
          {responses.map((response, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                Question {index + 1}: {response.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Your Answer:</h4>
                    <p className="text-muted-foreground">{response.answer}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Feedback:</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Good points covered on technical aspects</li>
                      <li>Could provide more specific examples</li>
                      <li>Structure could be more concise</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Improvement Suggestions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Key Recommendations</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Practice more concise answers using the STAR method</li>
            <li>Include more specific technical examples in responses</li>
            <li>Work on maintaining consistent eye contact</li>
          </ul>
        </div>

        <Button onClick={onStartNew} className="w-full">
          Start New Practice Session
        </Button>
      </div>
    </Card>
  );
}
