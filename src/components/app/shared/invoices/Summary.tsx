import { TargetInfo } from "@/components/app/shared/invoices/TargetInfo";
import { useDict } from "@/hooks/useDict";
import { useTheme } from "next-themes";
import Image from "next/image";

export const Summary = ({
  title,
  target,
}: {
  title: string;
  target: {
    title: string;
    items: string[];
  };
}) => {
  const dict = useDict();
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-1 gap-4 px-6">
      <h1 className="text-3xl leading-8 font-bold text-[#1A1C21] dark:text-white">
        {title}
      </h1>
      <div className="flex items-center justify-between">
        <TargetInfo title={target.title} items={target.items} />
        <div className="grid grid-cols-1 justify-items-center gap-4">
          <div className="relative aspect-76/59 w-19">
            <Image
              src={
                theme === "dark"
                  ? "/images/logo.white.png"
                  : "/images/logo.black.png"
              }
              alt="logo"
              fill
              className="object-contain"
              crossOrigin="anonymous"
            />
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-1">
            <p className="text-xs leading-4 font-semibold text-[#5E6470] dark:text-white/70">
              {dict.common.company.name}
            </p>
            <p className="text-xs leading-4 font-normal text-[#5E6470] dark:text-white/70">
              {dict.common.company.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
