"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { FileSymlink } from "lucide-react";

interface MultiFilePickerProps {
  onFilesPick: (files: File[]) => void; // 传递 File 对象数组
  disabled: boolean;
}

const MultiFilePicker: React.FC<MultiFilePickerProps> = ({
  onFilesPick,
  disabled,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesPick(acceptedFiles); // 直接传递 File 对象数组
    },
    [onFilesPick]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    }, // No restrictions, accept all file types
    multiple: true, // Allow multiple file selection
    maxSize: 10485760, // 10 MB per file
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input disabled={disabled} {...getInputProps()} />
      <Button
        disabled={disabled}
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full shrink-0">
        <FileSymlink className="w-5 h-5" />
        {isDragActive && <span className="sr-only">Drop the files here</span>}
      </Button>
    </div>
  );
};

export default MultiFilePicker;
