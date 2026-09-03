"use client";
import { Header } from "@/components/shared/Header";
export const SiteLayout = ({
  children,
  headerLogoPath,
}: {
  children: React.ReactNode;
  headerLogoPath: string | null;
}) => {
  return (
    <main className="dark:bg-dark-black mx-auto grid h-screen grid-cols-1 overflow-y-auto bg-[#F8F7FC]">
      <Header headerLogoPath={headerLogoPath} />
      {children}
    </main>
  );
};
