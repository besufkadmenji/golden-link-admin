declare module "*.svg" {
  import type { ReactElement, SVGProps } from "react";

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

// add these declarations for raster images:
declare module "*.png" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}
declare module "*.jpg" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}
declare module "*.jpeg" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}
declare module "*.webp" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}
declare module "*.avif" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
