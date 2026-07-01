import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STATIC_ALLOWED_HOSTS = new Set([
  "storage.googleapis.com",
  "backend.goldenlink.moltaqadev.com",
  "api.iga.sa",
]);

const getAllowedHosts = (): Set<string> => {
  const hosts = new Set(STATIC_ALLOWED_HOSTS);
  const apiBaseUrl =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (apiBaseUrl) {
    try {
      hosts.add(new URL(apiBaseUrl).hostname);
    } catch {
      // Ignore invalid API base URL values.
    }
  }

  return hosts;
};

const isAllowedUrl = (url: URL): boolean => {
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return false;
  }

  return getAllowedHosts().has(url.hostname);
};

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ message: "Missing url parameter." }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ message: "Invalid url parameter." }, { status: 400 });
  }

  if (!isAllowedUrl(targetUrl)) {
    return NextResponse.json({ message: "URL host is not allowed." }, { status: 403 });
  }

  try {
    const upstream = await fetch(targetUrl.toString());

    if (!upstream.ok) {
      return NextResponse.json(
        { message: "Unable to fetch file from upstream." },
        { status: upstream.status },
      );
    }

    const buffer = await upstream.arrayBuffer();
    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";
    const filename = targetUrl.pathname.split("/").pop() ?? "file";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach upstream file host." },
      { status: 502 },
    );
  }
}
