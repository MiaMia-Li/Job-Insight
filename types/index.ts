// 定义基本分析结果的类型
export type BasicAnalysis = {
  overall: number;
  content: number;
  keywords: number;
  format: number;
  atsCompatibility: number;
  strengths: string[];
  improvements: string[];
  summary: string;
};

// 定义详细分析结果的类型（包含关键词匹配）
export type DetailedAnalysis = BasicAnalysis & {
  keywordMatch: Array<{
    keyword: string;
    found: boolean;
    context: string;
  }>;
};

// types/auth.ts
export interface AuthContextType {
  showLoginDialog: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  requireAuth: (callback: () => void) => void;
  credits?: number;
  updateCredits?: (newCredits: number) => void;
  refreshCredits?: () => void;
}
