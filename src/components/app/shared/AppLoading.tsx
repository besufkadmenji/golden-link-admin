import { Spinner } from "@heroui/react";
import { twMerge } from "tailwind-merge";

export const AppLoading = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <Spinner
        size="lg"
        classNames={{
          circle1: " border-b-app-primary",
        }}
      />
    </div>
  );
};
