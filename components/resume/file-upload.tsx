"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

interface FileUploaderProps {
  onFilesPick: (files: File[]) => void;
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesPick,
  disabled,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesPick(acceptedFiles);
    },
    [onFilesPick]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="mb-12">
      <div {...getRootProps()} className="transition-opacity duration-300">
        <input {...getInputProps()} />
        <section className="mb-12 relative">
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <h3 className="mt-4 text-xl font-semibold">Upload Your Resume</h3>
            <p className="mt-2 text-sm text-gray-500">
              Drag and drop your resume file (PDF or Word) or click to browse
            </p>
            <Button className="mt-4" disabled={disabled}>
              Select File
            </Button>
          </div>
        </section>
      </div>

      {/* <div>
        {((attachments && attachments.length > 0) ||
          uploadQueue.length > 0) && (
          <div
            className="flex items-start space-x-3 transition-all duration-300 ease-in-out transform"
            style={{
              animation: "slideIn 0.3s ease-out",
            }}>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1">
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
                <div
                  key={filename}
                  className="bg-white rounded-lg p-4 shadow-sm">
                  <PreviewAttachment
                    key={filename}
                    attachment={{
                      url: "",
                      name: filename,
                      contentType: "",
                    }}
                    isUploading={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default FileUploader;
