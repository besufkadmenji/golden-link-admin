"use client";

import HorizontalFallbackLogo from "@/assets/icons/logo.horizontal.svg";
import MainFallbackLogo from "@/assets/icons/main.logo.svg";
import { useSetting } from "@/components/app/Settings/useSettings";
import { resolveApiAssetUrl } from "@/utils/url";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export const PlatformLogo = ({
  className,
  initialLogoPath,
  fallback = "horizontal",
  refreshFromAuthenticatedSetting = true,
}: {
  className?: string;
  initialLogoPath: string | null;
  fallback?: "horizontal" | "main";
  refreshFromAuthenticatedSetting?: boolean;
}) => {
  const { setting } = useSetting(
    "header_logo",
    refreshFromAuthenticatedSetting,
  );
  const currentLogoPath =
    typeof setting?.value === "string" ? setting.value : initialLogoPath;
  const logoUrl = useMemo(
    () => resolveApiAssetUrl(currentLogoPath),
    [currentLogoPath],
  );
  const [imageFailed, setImageFailed] = useState(false);
  const logoClassName = `size-full ${className ?? ""}`;

  useEffect(() => {
    setImageFailed(false);
  }, [logoUrl]);

  if (!logoUrl || imageFailed) {
    const FallbackLogo =
      fallback === "main" ? MainFallbackLogo : HorizontalFallbackLogo;
    return <FallbackLogo className={logoClassName} />;
  }

  return (
    <Image
      src={logoUrl}
      alt="Golden Link"
      fill
      className={`object-contain ${logoClassName}`}
      onError={() => setImageFailed(true)}
    />
  );
};
