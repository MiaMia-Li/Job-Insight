"use client";

import React, { useEffect, useCallback } from "react";
import { ChatProps } from "./chat";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cross2Icon,
  ImageIcon,
  PaperPlaneIcon,
  StopIcon,
} from "@radix-ui/react-icons";
import { Mic, SendHorizonal } from "lucide-react";
import useSpeechToText from "../../app/hooks/useSpeechRecognition";
import MultiImagePicker from "../image-embedder";
import useChatStore from "../../app/hooks/useChatStore";
import Image from "next/image";
import MultiFilePicker from "../file-embedder";
import { toast } from "sonner";
import PreviewAttachment from "../preview-attachment";

export default function ChatBottombar({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  formRef,
  setInput,
}: ChatProps) {
  const [message, setMessage] = React.useState(input);
  const [isMobile, setIsMobile] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const base64Images = useChatStore((state) => state.base64Images);
  const attachments = useChatStore((state) => state.attachments);
  const setBase64Images = useChatStore((state) => state.setBase64Images);
  const setAttachments = useChatStore((state) => state.setAttachments);
  const env = process.env.NODE_ENV;
  const [uploadQueue, setUploadQueue] = React.useState<string[]>([]);
  // const [fileList, setFileList] = React.useState<
  //   { url: string; name: string; contentType: string }[]
  // >([]);

  React.useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const uploadFile = useCallback(
    async (
      file: File
    ): Promise<
      | { url: string; name: string; contentType: string; content: string }
      | undefined
    > => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`/api/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Server error during file upload."
          );
        }

        const { url, pathname, contentType, markdown } = await response.json();
        // setInput(markdown || "");
        return { url, name: pathname, contentType, content: markdown };
      } catch (error) {
        console.error("File upload error:", error);
        toast.error((error as Error).message || "Upload failed, try again.");
        return undefined;
      }
    },
    []
  );

  const handleFilesPick = useCallback(
    async (files: File[]) => {
      setUploadQueue(files.map((file) => file.name));
      try {
        const uploadPromises = files.map(uploadFile);
        const uploadedFiles = await Promise.all(uploadPromises);

        const validAttachments = uploadedFiles.filter(
          (
            file
          ): file is {
            url: string;
            name: string;
            contentType: string;
            content: string;
          } => file !== undefined
        );

        setAttachments((current) => [...(current || []), ...validAttachments]);
        // setInput && setInput(validAttachments[0].content || "");
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setUploadQueue([]);
      }
    },
    [uploadFile]
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const listen = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  const stopVoiceInput = () => {
    setInput && setInput(transcript.length ? transcript : "");
    stopListening();
  };

  const handleListenClick = () => {
    listen();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      stopVoiceInput();
    }
  }, [isLoading]);

  return (
    <div className="p-4 pb-7 flex justify-between w-full items-center gap-2">
      <AnimatePresence initial={false}>
        <div className="w-full items-center flex relative gap-2">
          <div className="flex flex-col relative w-full bg-accent dark:bg-card rounded-lg">
            <div className="flex w-full">
              <form
                onSubmit={handleSubmit}
                className="w-full items-center flex relative gap-2">
                <div className="absolute flex left-3 z-10">
                  <MultiImagePicker
                    disabled={env === "production"}
                    onImagesPick={setBase64Images}
                  />
                  <MultiFilePicker
                    disabled={env === "production"}
                    onFilesPick={handleFilesPick}
                  />
                </div>
                <TextareaAutosize
                  autoComplete="off"
                  value={
                    isListening ? (transcript.length ? transcript : "") : input
                  }
                  ref={inputRef}
                  onKeyDown={handleKeyPress}
                  onChange={handleInputChange}
                  name="message"
                  placeholder={
                    !isListening ? "Enter your prompt here" : "Listening"
                  }
                  className=" max-h-24 pr-14 pl-24 bg-accent py-[22px] rounded-lg  text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full flex items-center h-16 resize-none overflow-hidden dark:bg-card"
                />

                {!isLoading ? (
                  <div className="flex absolute right-3 items-center">
                    {isListening ? (
                      <div className="flex">
                        <Button
                          className="shrink-0 relative rounded-full bg-blue-500/30 hover:bg-blue-400/30 "
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={handleListenClick}
                          disabled={isLoading}>
                          <Mic className="w-5 h-5 " />
                          <span className="animate-pulse absolute h-[120%] w-[120%] rounded-full bg-blue-500/30" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="shrink-0 rounded-full"
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={handleListenClick}
                        disabled={isLoading}>
                        <Mic className="w-5 h-5 " />
                      </Button>
                    )}
                    <Button
                      className="shrink-0 rounded-full"
                      variant="ghost"
                      size="icon"
                      type="submit"
                      disabled={isLoading || !input.trim() || isListening}>
                      <SendHorizonal className="w-5 h-5 " />
                    </Button>
                  </div>
                ) : (
                  <div className="flex absolute right-3 items-center">
                    <Button
                      className="shrink-0 rounded-full"
                      variant="ghost"
                      size="icon"
                      type="button"
                      disabled={true}>
                      <Mic className="w-5 h-5 " />
                    </Button>
                    <Button
                      className="shrink-0 rounded-full"
                      variant="ghost"
                      size="icon"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        stop();
                      }}>
                      <StopIcon className="w-5 h-5  " />
                    </Button>
                  </div>
                )}
              </form>
            </div>

            <div className="flex px-2 pb-2 gap-2 ">
              {base64Images &&
                base64Images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="relative bg-muted-foreground/20 flex w-fit flex-col gap-2 p-1 border-t border-x rounded-md">
                      <div className="flex text-sm">
                        <Image
                          src={image}
                          width={20}
                          height={20}
                          className="h-auto rounded-md w-auto max-w-[100px] max-h-[100px]"
                          alt={""}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          const updatedImages = (prevImages: string[]) =>
                            prevImages.filter((_, i) => i !== index);
                          setBase64Images(updatedImages(base64Images));
                        }}
                        size="icon"
                        className="absolute -top-1.5 -right-1.5 text-white cursor-pointer  bg-red-500 hover:bg-red-600 w-4 h-4 rounded-full flex items-center justify-center">
                        <Cross2Icon className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
              {((attachments && attachments.length > 0) ||
                uploadQueue.length > 0) && (
                <div className="flex flex-row gap-2">
                  {attachments &&
                    attachments.map((attachment, index) => (
                      <div key={index}>
                        <PreviewAttachment
                          key={attachment.url}
                          attachment={attachment}
                          onDelete={() => {
                            const updatedImages = (attachments: any) =>
                              attachments.filter((_, i) => i !== index);
                            setAttachments(updatedImages(attachments));
                          }}
                        />
                      </div>
                    ))}

                  {uploadQueue.map((filename) => (
                    <PreviewAttachment
                      key={filename}
                      attachment={{
                        url: "",
                        name: filename,
                        contentType: "",
                      }}
                      isUploading={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
