import { AppHeroUIProvider } from "@/config/app.provider";
import type { Metadata } from "next";
import "react-day-picker/style.css";
import "../globals.css";
import { dir } from "i18next";
import Script from "next/script";
import { cairo } from "@/assets/fonts/cairo";
import { inter } from "@/assets/fonts/inter";

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
    <html
      lang={lang}
      dir={dir(lang)}
      key={lang}
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="remove-hash" strategy="beforeInteractive">
          {`if (location.hash) history.replaceState(null, '', location.href.split('#')[0]);`}
        </Script>
      </head>
      <body className="overflow-hidden font-sans antialiased">
        <AppHeroUIProvider>{children}</AppHeroUIProvider>
      </body>
    </html>
  );
}
