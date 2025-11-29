import { AppLayoutWrapper } from "@/components/app/shared/AppLayout";


export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayoutWrapper>{children}</AppLayoutWrapper>;
}
