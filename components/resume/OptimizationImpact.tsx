// src/components/resume/optimization/impact.jsx
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function OptimizationImpact({
  resumeData,
  acceptedSuggestions,
}) {
  // Calculate potential score based on accepted suggestions
  const totalAcceptedSuggestions =
    Object.values(acceptedSuggestions).flat().length;
  const potentialScore = Math.min(
    100,
    resumeData.score.overall + Math.floor(totalAcceptedSuggestions * 2.5)
  );

  // Calculate improvement percentages
  const interviewImprovement = Math.min(
    95,
    Math.floor(totalAcceptedSuggestions * 6.5)
  );
  const atsImprovement = Math.min(
    95,
    Math.floor(totalAcceptedSuggestions * 3.8)
  );
  const readabilityImprovement = Math.min(
    95,
    Math.floor(totalAcceptedSuggestions * 4.2)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Impact</CardTitle>
        <CardDescription>
          How these changes will improve your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Current Score</p>
              <p className="text-3xl font-bold text-muted-foreground">
                {resumeData.score.overall}
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-right font-medium text-foreground">
                Potential Score
              </p>
              <p className="text-right text-3xl font-bold text-primary">
                {potentialScore}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Estimated Improvements
            </h4>

            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Interview Chances</span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    +{interviewImprovement}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${interviewImprovement}%` }}></div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">ATS Compatibility</span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    +{atsImprovement}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${atsImprovement}%` }}></div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm">Recruiter Readability</span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    +{readabilityImprovement}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${readabilityImprovement}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-medium text-foreground">Expert Insight</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our analysis shows that resumes with scores above 85 are 3x
                  more likely to result in interview invitations. The suggested
                  optimizations address the key areas that hiring managers and
                  ATS systems prioritize.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
