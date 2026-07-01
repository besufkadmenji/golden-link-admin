const MIME_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  pdf: "application/pdf",
  webp: "image/webp",
};

const getFilenameFromUrl = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    const filename = pathname.split("/").pop();
    return filename && filename.trim() !== "" ? filename : "document";
  } catch {
    return "document";
  }
};

const getMimeTypeFromFilename = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  return MIME_BY_EXTENSION[extension] ?? "application/octet-stream";
};

export const fetchUrlAsFile = async (url: string): Promise<File> => {
  const response = await fetch(`/api/fetch-file?url=${encodeURIComponent(url)}`);

  if (!response.ok) {
    throw new Error("Failed to download existing document.");
  }

  const blob = await response.blob();
  const filename = getFilenameFromUrl(url);
  const type =
    blob.type && blob.type !== "application/octet-stream"
      ? blob.type
      : getMimeTypeFromFilename(filename);

  return new File([blob], filename, { type });
};

export const resolveImageFile = async (
  file?: File,
  existingUrl?: string | null,
): Promise<File | undefined> => {
  if (file instanceof File) {
    return file;
  }

  if (existingUrl) {
    return fetchUrlAsFile(existingUrl);
  }

  return undefined;
};
