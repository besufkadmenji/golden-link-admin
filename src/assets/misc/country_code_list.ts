import type { ComponentType } from "react";
import * as Flags from "country-flag-icons/react/3x2";

export type CountryCodeEntry = {
  code: string;
  value: string;
  labelAr: string;
  labelEn: string;
  Flag: ComponentType<{ className?: string }>;
};

export const DEFAULT_COUNTRY_CODE = "SA";

export const COUNTRY_CODE_LIST: CountryCodeEntry[] = [
  {
    code: "SA",
    value: "+966",
    labelAr: "السعودية",
    labelEn: "Saudi Arabia",
    Flag: Flags.SA,
  },
  {
    code: "AE",
    value: "+971",
    labelAr: "الإمارات العربية المتحدة",
    labelEn: "United Arab Emirates",
    Flag: Flags.AE,
  },
  {
    code: "KW",
    value: "+965",
    labelAr: "الكويت",
    labelEn: "Kuwait",
    Flag: Flags.KW,
  },
  {
    code: "QA",
    value: "+974",
    labelAr: "قطر",
    labelEn: "Qatar",
    Flag: Flags.QA,
  },
  {
    code: "BH",
    value: "+973",
    labelAr: "البحرين",
    labelEn: "Bahrain",
    Flag: Flags.BH,
  },
  {
    code: "OM",
    value: "+968",
    labelAr: "عُمان",
    labelEn: "Oman",
    Flag: Flags.OM,
  },
  {
    code: "EG",
    value: "+20",
    labelAr: "مصر",
    labelEn: "Egypt",
    Flag: Flags.EG,
  },
  {
    code: "JO",
    value: "+962",
    labelAr: "الأردن",
    labelEn: "Jordan",
    Flag: Flags.JO,
  },
  {
    code: "LB",
    value: "+961",
    labelAr: "لبنان",
    labelEn: "Lebanon",
    Flag: Flags.LB,
  },
  {
    code: "SY",
    value: "+963",
    labelAr: "سوريا",
    labelEn: "Syria",
    Flag: Flags.SY,
  },
  {
    code: "IQ",
    value: "+964",
    labelAr: "العراق",
    labelEn: "Iraq",
    Flag: Flags.IQ,
  },
  {
    code: "MA",
    value: "+212",
    labelAr: "المغرب",
    labelEn: "Morocco",
    Flag: Flags.MA,
  },
  {
    code: "DZ",
    value: "+213",
    labelAr: "الجزائر",
    labelEn: "Algeria",
    Flag: Flags.DZ,
  },
  {
    code: "TN",
    value: "+216",
    labelAr: "تونس",
    labelEn: "Tunisia",
    Flag: Flags.TN,
  },
  {
    code: "LY",
    value: "+218",
    labelAr: "ليبيا",
    labelEn: "Libya",
    Flag: Flags.LY,
  },
  {
    code: "SD",
    value: "+249",
    labelAr: "السودان",
    labelEn: "Sudan",
    Flag: Flags.SD,
  },
  {
    code: "YE",
    value: "+967",
    labelAr: "اليمن",
    labelEn: "Yemen",
    Flag: Flags.YE,
  },
  {
    code: "US",
    value: "+1",
    labelAr: "الولايات المتحدة",
    labelEn: "United States",
    Flag: Flags.US,
  },
  {
    code: "CA",
    value: "+1",
    labelAr: "كندا",
    labelEn: "Canada",
    Flag: Flags.CA,
  },
  {
    code: "GB",
    value: "+44",
    labelAr: "المملكة المتحدة",
    labelEn: "United Kingdom",
    Flag: Flags.GB,
  },
  {
    code: "FR",
    value: "+33",
    labelAr: "فرنسا",
    labelEn: "France",
    Flag: Flags.FR,
  },
  {
    code: "DE",
    value: "+49",
    labelAr: "ألمانيا",
    labelEn: "Germany",
    Flag: Flags.DE,
  },
  {
    code: "IT",
    value: "+39",
    labelAr: "إيطاليا",
    labelEn: "Italy",
    Flag: Flags.IT,
  },
  {
    code: "ES",
    value: "+34",
    labelAr: "إسبانيا",
    labelEn: "Spain",
    Flag: Flags.ES,
  },
  {
    code: "TR",
    value: "+90",
    labelAr: "تركيا",
    labelEn: "Turkey",
    Flag: Flags.TR,
  },
  {
    code: "IN",
    value: "+91",
    labelAr: "الهند",
    labelEn: "India",
    Flag: Flags.IN,
  },
  {
    code: "PK",
    value: "+92",
    labelAr: "باكستان",
    labelEn: "Pakistan",
    Flag: Flags.PK,
  },
  {
    code: "BD",
    value: "+880",
    labelAr: "بنغلاديش",
    labelEn: "Bangladesh",
    Flag: Flags.BD,
  },
  {
    code: "CN",
    value: "+86",
    labelAr: "الصين",
    labelEn: "China",
    Flag: Flags.CN,
  },
  {
    code: "JP",
    value: "+81",
    labelAr: "اليابان",
    labelEn: "Japan",
    Flag: Flags.JP,
  },
  {
    code: "KR",
    value: "+82",
    labelAr: "كوريا الجنوبية",
    labelEn: "South Korea",
    Flag: Flags.KR,
  },
  {
    code: "AU",
    value: "+61",
    labelAr: "أستراليا",
    labelEn: "Australia",
    Flag: Flags.AU,
  },
  {
    code: "BR",
    value: "+55",
    labelAr: "البرازيل",
    labelEn: "Brazil",
    Flag: Flags.BR,
  },
  {
    code: "MX",
    value: "+52",
    labelAr: "المكسيك",
    labelEn: "Mexico",
    Flag: Flags.MX,
  },
  {
    code: "RU",
    value: "+7",
    labelAr: "روسيا",
    labelEn: "Russia",
    Flag: Flags.RU,
  },
  {
    code: "ZA",
    value: "+27",
    labelAr: "جنوب أفريقيا",
    labelEn: "South Africa",
    Flag: Flags.ZA,
  },
  {
    code: "NG",
    value: "+234",
    labelAr: "نيجيريا",
    labelEn: "Nigeria",
    Flag: Flags.NG,
  },
  {
    code: "KE",
    value: "+254",
    labelAr: "كينيا",
    labelEn: "Kenya",
    Flag: Flags.KE,
  },
  {
    code: "ET",
    value: "+251",
    labelAr: "إثيوبيا",
    labelEn: "Ethiopia",
    Flag: Flags.ET,
  },
  {
    code: "GH",
    value: "+233",
    labelAr: "غانا",
    labelEn: "Ghana",
    Flag: Flags.GH,
  },
];

export const findCountryByCode = (
  countryCode: string,
): CountryCodeEntry | undefined => {
  const normalized = countryCode.trim();
  return COUNTRY_CODE_LIST.find(
    (country) => country.code === normalized || country.value === normalized,
  );
};

export const getDialCode = (countryCode: string): string => {
  return findCountryByCode(countryCode)?.value ?? "+966";
};

export const toIsoCountryCode = (countryCode: string): string => {
  return findCountryByCode(countryCode)?.code ?? DEFAULT_COUNTRY_CODE;
};
