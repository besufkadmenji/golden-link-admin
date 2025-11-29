"use client";

import Link, { LinkProps } from "next/link";

export const AppLink = ({
  prefetch,
  ...rest
}: LinkProps & { children: React.ReactNode; className?: string }) => {
  return <Link {...rest} prefetch={false} />;
};
