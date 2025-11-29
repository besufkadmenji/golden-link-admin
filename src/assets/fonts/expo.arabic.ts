import localFont from "next/font/local";

export const expoArabic = localFont({
  src: [
    {
      path: "./ExpoArabic/ExpoArabicBook.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ExpoArabic/ExpoArabicBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./ExpoArabic/ExpoArabicLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./ExpoArabic/ExpoArabicMedium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});
