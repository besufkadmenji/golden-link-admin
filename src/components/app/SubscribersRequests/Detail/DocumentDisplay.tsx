"use client";

import Image from "next/image";
import { FileIcon, defaultStyles } from "react-file-icon";

interface DocumentDisplayProps {
  documentPath?: string;
  isImage?: boolean;
}

const isImageFile = (path: string): boolean => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const lowerPath = path.toLowerCase();
  return imageExtensions.some((ext) => lowerPath.includes(ext));
};

export const DocumentDisplay = ({
  documentPath,
  isImage,
}: DocumentDisplayProps) => {
  if (!documentPath) {
    return null;
  }

  const shouldShowAsImage = isImage ?? isImageFile(documentPath);

  const handleOpen = () => {
    window.open(documentPath, "_blank");
  };

  return (
    <div
      className="bg-dashboard-border grid size-20 cursor-pointer grid-cols-1 items-center justify-center rounded-lg transition-opacity hover:opacity-80"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleOpen();
        }
      }}
    >
      {shouldShowAsImage ? (
        <div className="relative h-full w-full">
          <Image
            src={documentPath}
            alt="Document preview"
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <FileIcon
          extension={getFileExtension(documentPath)}
          {...defaultStyles.pdf}
        />
      )}
    </div>
  );
};

const getFileExtension = (path: string): string => {
  const match = path.match(/\.([^.?]+)(?:\?|$)/);
  return match ? match[1].toLowerCase() : "file";
};
