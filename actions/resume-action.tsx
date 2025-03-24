"use server";

import { getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { z } from "zod";
import { generateId } from "ai";
import ResumeResult from "../components/resume/resume-result";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

// const scoreCategories = [
//   { name: "Content Quality", score: 75 },
//   { name: "Keyword Optimization", score: 65 },
//   { name: "Structure & Format", score: 85 },
// ];

// const sections = [
//   {
//     id: "skills",
//     name: "Skills",
//     suggestions: [
//       {
//         title: "Add More Technical Skills",
//         description: "Include relevant programming languages and frameworks",
//       },
//       {
//         title: "Highlight Soft Skills",
//         description: "Add leadership and communication abilities",
//       },
//     ],
//   },
//   {
//     id: "experience",
//     name: "Experience",
//     suggestions: [
//       {
//         title: "Quantify Achievements",
//         description: "Add metrics and specific results to your accomplishments",
//       },
//       {
//         title: "Use Action Verbs",
//         description: "Start bullet points with strong action verbs",
//       },
//     ],
//   },
//   {
//     id: "education",
//     name: "Education",
//     suggestions: [
//       {
//         title: "Add Relevant Coursework",
//         description: "Include courses that align with target positions",
//       },
//       {
//         title: "Highlight Academic Achievements",
//         description: "Add GPA, honors, and academic projects",
//       },
//     ],
//   },
// ];

const resumeAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  scoreCategories: z.array(
    z.object({
      name: z.string(),
      score: z.number().min(0).max(100),
    })
  ),
  sections: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      suggestions: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          priority: z.enum(["high", "medium", "low"]),
        })
      ),
    })
  ),
  basicInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    education: z.string(),
    summary: z.string().optional(),
  }),
  workExperience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      period: z.string(),
      description: z.string(),
      achievements: z.array(z.string()).optional(),
    })
  ),
  skills: z.array(z.string()),
});

export async function continueConversation(
  fileContent: string
): Promise<ClientMessage> {
  const history = getMutableAIState();

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    messages: [
      ...history.get(),
      {
        role: "system",
        content:
          "You are a professional resume analyst. Please analyze the resume content in detail and provide scores and improvement suggestions,Scoring from three aspects: Content Quality, Keyword Optimization, Structure & Format then give a summary and total score of the resume",
      },
      {
        role: "user",
        content: fileContent,
      },
    ],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      analyzeResume: {
        description:
          "Analyze the resume content and provide scores and suggestions",
        parameters: resumeAnalysisSchema,
        generate: async (resumeData) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `简历分析完成，总评分：${resumeData.score}分`,
            },
          ]);

          return <ResumeResult data={resumeData} />;
        },
      },
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}
