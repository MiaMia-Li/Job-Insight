// contexts/auth.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import { AuthContextType } from "@/types/index";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(
    null
  );
  const { data: session, update: updateSession } = useSession();
  //const [credits, setCredits] = useState<number>(session?.user?.credits || 0);

  //   // 初始化和session更新时同步credits
  //   useEffect(() => {
  //     if (session?.user?.credits !== undefined) {
  //       setCredits(session.user.credits);
  //     }
  //   }, [session?.user?.credits]);

  //   // 更新credits的方法
  //   const updateCredits = useCallback((newCredits: number) => {
  //     setCredits(newCredits);
  //   }, []);

  //   // 刷新credits的方法（从服务器获取最新数据）
  //   const refreshCredits = useCallback(async () => {
  //     try {
  //       await updateSession(); // 这会触发session更新
  //     } catch (error) {
  //       console.error("Failed to refresh credits:", error);
  //     }
  //   }, [updateSession]);

  // 监听session变化
  useEffect(() => {
    if (session && pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
      closeLoginDialog();
    }
  }, [session]);

  const openLoginDialog = useCallback(() => {
    setShowLoginDialog(true);
  }, []);

  const closeLoginDialog = useCallback(() => {
    setShowLoginDialog(false);
    setPendingCallback(null);
  }, []);

  const requireAuth = useCallback(
    (callback: () => void) => {
      if (!session) {
        setPendingCallback(() => callback);
        openLoginDialog();
        return;
      }
      callback();
    },
    [session, openLoginDialog]
  );

  const value = {
    // credits,
    // updateCredits,
    // refreshCredits,
    showLoginDialog,
    openLoginDialog,
    closeLoginDialog,
    requireAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
