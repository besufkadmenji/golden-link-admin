import { useDict } from "@/hooks/useDict";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
export const FormTitle = ({
  title,
  subTitle,
  className,
  endContent,
}: {
  title?: string;
  subTitle?: string;
  className?: string;
  endContent?: ReactNode;
}) => {
  const dict = useDict();

  //assert at least title or type is provided
  if (title === undefined) {
    throw new Error("Either title or type must be provided");
  }
  return (
    <div className="flex items-center justify-between">
      <p
        className={twMerge(
          "text-secondary dark:text-dark-white flex items-center gap-2 text-lg leading-6 font-bold tracking-tight",
          className,
        )}
      >
        {title}
        {subTitle && (
          <span className="text-subTitle dark:text-white/70">{subTitle}</span>
        )}
      </p>
      {endContent && endContent}
    </div>
  );
};
