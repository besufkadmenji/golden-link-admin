import { inter } from "@/assets/fonts/inter";

export const InvoiceFooter = () => {
  return (
    <div className="flex h-17.5 items-center justify-between border-t-[0.5px] border-t-[#D7DAE0] dark:border-t-dark-border px-13 pt-4">
      <p
        className={`text-xs ${inter.className} leading-4 font-medium text-[#5E6470] dark:text-white/70`}
      >
        hello@email.com
      </p>
      <p
        className={`text-xs ${inter.className} leading-4 font-medium text-[#5E6470] dark:text-white/70`}
        dir="ltr"
      >
        +91 00000 00000
      </p>
      <p
        className={`text-xs ${inter.className} leading-4 font-medium text-[#5E6470] dark:text-white/70`}
      >
        www.website.com
      </p>
    </div>
  );
};
