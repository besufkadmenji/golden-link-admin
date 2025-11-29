"use client";
import { Header } from "@/components/shared/Header";
export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto grid h-screen grid-cols-1 overflow-y-auto bg-[#F8F7FC]">
      <Header />
      {children}
    </main>
  );
};
