import { AxiosError } from "axios";

export const extractAxiosErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) {
      return data.message;
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
