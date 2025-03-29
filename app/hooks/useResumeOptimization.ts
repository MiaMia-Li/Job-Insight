// src/hooks/use-resume-optimization.js
import { useState, useEffect, useCallback } from "react";

export function useResumeOptimization(resumeId: string) {
  const [resumeData, setResumeData] = useState(null);
  const [originalResumeData, setOriginalResumeData] = useState(null);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState({
    content: [],
    keywords: [],
    format: [],
    custom: [],
  });
  const [acceptedSuggestions, setAcceptedSuggestions] = useState({
    content: [],
    keywords: [],
    format: [],
    custom: [],
  });
  const [optimizationApplied, setOptimizationApplied] = useState(false);
  const [optimizationInProgress, setOptimizationInProgress] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [optimizationPreferences, setOptimizationPreferences] = useState({
    focusOnATS: true,
    emphasizeSkills: true,
    quantifyAchievements: true,
    improveReadability: true,
    customFocus: "",
  });

  // Fetch resume analysis data via API
  const fetchResumeAnalysis = useCallback(
    async (options = {}) => {
      if (!resumeId) return;

      try {
        setIsLoading(true);

        // 构建查询参数
        const queryParams = new URLSearchParams();

        const url = `/api/resume/analysis/${resumeId}`;

        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized - Please log in");
          } else if (response.status === 404) {
            throw new Error("Resume analysis not found");
          } else {
            throw new Error(
              `Failed to fetch resume analysis: ${response.status}`
            );
          }
        }
        //   id: resumeId,
        // fileName: "john_doe_resume.pdf",
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
        // content: {
        //   header: {
        //     name: "John Doe",
        //     contact: "email@example.com | (123) 456-7890",
        //   },
        //   summary: "Sales professional with experience in team management.",
        //   experience: [
        //     {
        //       title: "Sales Manager",
        //       company: "XYZ Company",
        //       date: "Jan 2020 - Present",
        //       description:
        //         "Managed a team and improved sales performance. Responsible for client relationships and reporting to senior management.",
        //     },
        //   ],
        //   skills: ["Microsoft Office", "Communication"],
        //   education: ["Bachelor's Degree in Business"],
        // },
        // score: {
        //   overall: 65,
        //   content: 60,
        //   keywords: 55,
        //   format: 70,
        //   atsCompatibility: 75,
        // },
        // analysis: {
        //   strengths: [
        //     "Clear job titles",
        //     "Chronological format",
        //     "Contact information present",
        //   ],
        //   weaknesses: [
        //     "Missing quantifiable achievements",
        //     "Limited skills section",
        //     "No professional summary",
        //   ],
        //   keywordMatches: [
        //     { text: "sales", count: 2, relevant: true },
        //     { text: "manager", count: 1, relevant: true },
        //     { text: "team", count: 1, relevant: true },
        //   ],

        const data = await response.json();
        console.log("--data", data);

        const analysisData = {
          id: data.id,
          fileName: data.fileName,
          score: {
            overall: data.result.overall,
            content: data.result.content,
            keywords: data.result.keywords,
            format: data.result.format,
            atsCompatibility: data.result.atsCompatibility,
          },
          analysis: {
            strengths: data.result.strengths,
            weaknesses: data.result.improvements,
            keywordMatches: data.result.keywordMatch,
          },
        };

        setResumeData(analysisData);
        setOriginalResumeData(analysisData);
        setOptimizationSuggestions(data.result.suggestions);

        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [resumeId]
  );

  // Initial data loading
  useEffect(() => {
    async function loadInitialData() {
      try {
        // 首先获取简历分析数据
        const analysisData = await fetchResumeAnalysis();

        // 然后获取初始优化建议
        await fetchResumeAnalysis({
          generateSuggestions: true,
        });
      } catch (err) {
        console.error("Failed to load initial data:", err);
      }
    }

    loadInitialData();
  }, [fetchResumeAnalysis]);

  // Toggle suggestion acceptance
  const toggleSuggestion = useCallback((category, index) => {
    setAcceptedSuggestions((prev) => {
      const newState = { ...prev };
      if (newState[category].includes(index)) {
        newState[category] = newState[category].filter((i) => i !== index);
      } else {
        newState[category] = [...newState[category], index];
      }
      return newState;
    });
  }, []);

  // Apply optimization via API
  const applyOptimization = useCallback(async () => {
    setOptimizationInProgress(true);

    try {
      // Get all accepted suggestions
      const allAcceptedSuggestions = {
        content: acceptedSuggestions.content.map(
          (index) => optimizationSuggestions.content[index]
        ),
        keywords: acceptedSuggestions.keywords.map(
          (index) => optimizationSuggestions.keywords[index]
        ),
        format: acceptedSuggestions.format.map(
          (index) => optimizationSuggestions.format[index]
        ),
        custom: acceptedSuggestions.custom.map(
          (index) => optimizationSuggestions.custom[index]
        ),
      };

      // Apply optimizations via API
      const response = await fetch(`/api/resume/analysis/${resumeId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          suggestions: allAcceptedSuggestions,
          context: {
            jobDescription,
            targetRole,
            preferences: optimizationPreferences,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to apply optimizations: ${response.status}`);
      }

      const optimizedResume = await response.json();
      setResumeData(optimizedResume);
      setOptimizationApplied(true);
      setActiveTab("preview");
    } catch (err) {
      setError(err.message);
    } finally {
      setOptimizationInProgress(false);
    }
  }, [
    resumeId,
    acceptedSuggestions,
    optimizationSuggestions,
    jobDescription,
    targetRole,
    optimizationPreferences,
  ]);

  // Reset optimization
  const resetOptimization = useCallback(() => {
    setOptimizationApplied(false);
    setAcceptedSuggestions({
      content: [],
      keywords: [],
      format: [],
      custom: [],
    });
    setResumeData(originalResumeData);
  }, [originalResumeData]);

  // Customize optimization with job description or target role
  const customizeOptimization = useCallback(
    async (options) => {
      const { jobDescription, targetRole, preferences } = options;

      setJobDescription(jobDescription);
      setTargetRole(targetRole);

      if (preferences) {
        setOptimizationPreferences((prev) => ({
          ...prev,
          ...preferences,
        }));
      }

      // Get tailored suggestions based on job description and preferences
      await fetchResumeAnalysis({
        generateSuggestions: true,
        jobDescription,
        targetRole,
        preferences: preferences || optimizationPreferences,
      });
    },
    [fetchResumeAnalysis, optimizationPreferences]
  );

  return {
    resumeData,
    optimizationSuggestions,
    acceptedSuggestions,
    optimizationApplied,
    optimizationInProgress,
    isLoading,
    error,
    jobDescription,
    targetRole,
    optimizationPreferences,
    toggleSuggestion,
    applyOptimization,
    resetOptimization,
    customizeOptimization,
    setJobDescription,
    setTargetRole,
    setOptimizationPreferences,
    activeTab,
    setActiveTab,
  };
}
