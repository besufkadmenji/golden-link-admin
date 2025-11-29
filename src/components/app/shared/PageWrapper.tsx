import { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid auto-rows-max grid-cols-1 items-start">{children}</div>
  );
};
