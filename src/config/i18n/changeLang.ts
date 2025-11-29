"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function changeLang(
  lng: string,
  pathname: string,
  noRedirect?: boolean,
) {
  const cookieStore = await cookies();

  cookieStore.set("lng", lng);
  if (!noRedirect) {
    redirect(`/${lng}${pathname}`, RedirectType.replace);
  }
  return `/${lng}${pathname}`;
}
