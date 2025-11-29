"use client";
import { useParams } from "next/navigation";
export const useLang = () => {
  const { lang } = useParams();
  return `${lang ?? "ar"}`;
};
