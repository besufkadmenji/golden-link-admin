import { Accept } from "react-dropzone";

const MIME_EXTENSIONS: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
  "image/svg+xml": [".svg"],
  "application/pdf": [".pdf"],
};

/** Ensures Windows file dialogs filter by extension, not MIME type alone. */
export const normalizeAccept = (accept: Accept): Accept =>
  Object.fromEntries(
    Object.entries(accept).map(([mimeType, extensions]) => [
      mimeType,
      extensions.length > 0 ? extensions : (MIME_EXTENSIONS[mimeType] ?? []),
    ]),
  );

export const IMAGE_FILE_ACCEPT: Accept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export const IMAGE_AND_PDF_FILE_ACCEPT: Accept = {
  ...IMAGE_FILE_ACCEPT,
  "application/pdf": [".pdf"],
};
