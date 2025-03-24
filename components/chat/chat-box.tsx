"use client";

import React, { useEffect, useState } from "react";
import { Message } from "ai/react";
import Chat, { ChatProps } from "./chat";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

interface ChatLayoutProps {
  chatId: string;
  setMessages: (messages: Message[]) => void;
}

type MergedProps = ChatLayoutProps & ChatProps;

export function ChatBox({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  chatId,
  setSelectedModel,
  loadingSubmit,
  formRef,
  setMessages,
  setInput,
}: MergedProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Chat
            chatId={chatId}
            setSelectedModel={setSelectedModel}
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            loadingSubmit={loadingSubmit}
            error={error}
            stop={stop}
            formRef={formRef}
            isMobile={isMobile}
            setInput={setInput}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
}
