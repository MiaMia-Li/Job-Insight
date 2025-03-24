import { Attachment } from "ai";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import {
  FileImage,
  FileText,
  FileAudio,
  FileVideo,
  FileArchive,
  FileCode,
} from "lucide-react";
import PDF from "/public/PDF.svg";
import DOC from "/public/DOC.svg";
import TXT from "/public/TXT.svg";
import { Button } from "./ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

const PreviewAttachment = ({
  attachment,
  isUploading = false,
  onDelete,
  isPreview = false,
}: {
  attachment: Attachment;
  isUploading?: boolean;
  isPreview?: boolean;
  onDelete?: () => void;
}) => {
  const fileTypeIcons = (type: string | undefined) => {
    if (type?.includes("doc"))
      return <Image src={DOC} width={30} height={30} alt={type} />;
    if (type?.includes("text"))
      return <Image src={TXT} width={30} height={30} alt={type} />;
    if (type?.includes("pdf"))
      return <Image src={PDF} width={30} height={30} alt={type} />;

    return <FileCode className="w-5 h-5" />;
  };
  const { name, url, contentType } = attachment;

  if (isPreview) {
    return (
      <div className="flex text-sm items-center gap-2">
        {isUploading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Image src={PDF} width={30} height={30} alt={contentType || ""} />
        )}
        <div>
          <p>{name}</p>
          {/* <p className="text-muted-foreground">
            {formatContentType(contentType)}
          </p> */}
        </div>
      </div>
    );
  }
  return (
    <div className="relative bg-muted-foreground/20 flex w-fit flex-col gap-2 py-2 px-3 border-t border-x rounded-sm">
      <div className="flex text-sm items-center gap-2">
        {isUploading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Image src={PDF} width={30} height={30} alt={contentType || ""} />
        )}
        <div>
          <p>{name}</p>
          {/* <p className="text-muted-foreground">
            {formatContentType(contentType)}
          </p> */}
        </div>
      </div>
      {!isUploading && (
        <Button
          onClick={onDelete}
          size="icon"
          className="absolute -top-1.5 -right-1.5 text-white cursor-pointer  bg-red-500 hover:bg-red-600 w-4 h-4 rounded-full flex items-center justify-center">
          <Cross2Icon className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};

export default PreviewAttachment;
