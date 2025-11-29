import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const InvoiceWrapper = ({
  children,
  className,
  ref,
}: {
  children: ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "dark:bg-dark-black dark:border-b-dark-border grid grid-cols-1 gap-6 rounded-3xl border-b-[0.5px] border-b-[#D7DAE0] bg-white py-6",
        className,
      )}
    >
      {children}
    </div>
  );
};
