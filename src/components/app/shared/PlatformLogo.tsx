"use client";

import FallbackLogo from "@/assets/icons/logo.horizontal.svg";
import { useSetting } from "@/components/app/Settings/useSettings";
import { resolveApiAssetUrl } from "@/utils/url";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export const PlatformLogo = ({
  className,
  initialLogoPath,
}: {
  className?: string;
  initialLogoPath: string | null;
}) => {
  const { setting } = useSetting("header_logo");
  const currentLogoPath =
    typeof setting?.value === "string" ? setting.value : initialLogoPath;
  const logoUrl = useMemo(
    () => resolveApiAssetUrl(currentLogoPath),
    [currentLogoPath],
  );
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [logoUrl]);

  if (!logoUrl || imageFailed) {
    return <FallbackLogo className={className} />;
  }

  return (
    <Image
      src={logoUrl}
      alt="Golden Link"
      fill
      className={`object-contain ${className ?? ""}`}
      onError={() => setImageFailed(true)}
    />
  );
};
