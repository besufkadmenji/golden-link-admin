import axios from "axios";

type ApiErrorPayload = {
  message?: string | string[];
  error?: string;
  errors?: Array<{
    msg?: string;
    message?: string;
    path?: string;
  }>;
};

const getApiErrorMessage = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as ApiErrorPayload;
  const validationMessages = data.errors
    ?.map((error) => error.msg || error.message)
    .filter((message): message is string => Boolean(message));

  if (validationMessages?.length) {
    return validationMessages.join(" ");
  }

  if (Array.isArray(data.message)) {
    return data.message.filter(Boolean).join(" ");
  }

  if (data.message) {
    return data.message;
  }

  if (data.error) {
    return data.error;
  }

  return null;
};

export const extractAxiosErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (axios.isAxiosError(error)) {
    const message = getApiErrorMessage(error.response?.data);
    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const unwrapAxiosResponse = <T>(payload: unknown): T | null => {
  if (payload == null) {
    return null;
  }

  if (typeof payload === "object" && "data" in (payload as object)) {
    const data = (payload as { data?: T | null }).data;
    return (data ?? null) as T | null;
  }

  return payload as T;
};
