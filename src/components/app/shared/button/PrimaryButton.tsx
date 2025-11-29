"use client";

import { Button } from "@heroui/react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
export type PrimaryButtonProps = ComponentProps<typeof Button> & {};
export const PrimaryButton = ({
  className,
  children,
  ...rest
}: PrimaryButtonProps) => {
  const baseClass =
    "bg-app-primary h-10 px-3.5 text-sm rounded-lg leading-5 font-semibold tracking-tight text-white";
  return (
    <Button className={twMerge(baseClass, className)} {...rest}>
      {children}
    </Button>
  );
};
