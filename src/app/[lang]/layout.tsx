import { AppHeroUIProvider } from "@/config/app.provider";
import type { Metadata } from "next";
import "react-day-picker/style.css";
import "../globals.css";
import { dir } from "i18next";
import Script from "next/script";
import { expoArabic } from "@/assets/fonts/expo.arabic";
import { inter } from "@/assets/fonts/inter";
import { twMerge } from "tailwind-merge";

export const metadata: Metadata = {
  title: "Golden Link",
  description: "Welcome to Golden Link",
};

export type Params = Promise<{ lang: string }>;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={dir(lang)} key={lang} suppressHydrationWarning>
      <head>
        <Script id="remove-hash" strategy="beforeInteractive">
          {`if (location.hash) history.replaceState(null, '', location.href.split('#')[0]);`}
        </Script>
      </head>
      <body
        className={twMerge(
          "overflow-hidden antialiased",
          lang === "en" ? `${inter.className}` : `${expoArabic.className}`,
        )}
      >
        <AppHeroUIProvider>{children}</AppHeroUIProvider>
      </body>
    </html>
  );
}
