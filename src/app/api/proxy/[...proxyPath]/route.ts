import { NextRequest, NextResponse } from "next/server";
import { zstdDecompressSync } from "node:zlib";
export const dynamic = "force-dynamic";

const ZSTD_MAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);

function decompressZstdIfNeeded(
  bodyBuffer: ArrayBuffer,
  contentEncoding: string | null,
): Buffer {
  const buffer = Buffer.from(bodyBuffer);
  const encoding = contentEncoding?.toLowerCase() ?? "";
  const isZstdEncoded =
    encoding.includes("zstd") ||
    encoding.includes("zst") ||
    (buffer.length >= 4 && buffer.subarray(0, 4).equals(ZSTD_MAGIC));

  if (!isZstdEncoded) {
    return buffer;
  }

  return zstdDecompressSync(buffer);
}

const API_BASE_URL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const FORWARD_BODY_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const DISALLOWED_REQUEST_HEADERS = new Set([
  "connection",
  "content-length",
  "host",
]);

const DISALLOWED_RESPONSE_HEADERS = new Set(["transfer-encoding"]);

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
]);

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ proxyPath?: string[] }> },
) {
  const params = await context.params;
  if (!API_BASE_URL) {
    return Response.json(
      { message: "API base URL is not configured." },
      { status: 500 },
    );
  }
  const segments = params.proxyPath ?? [];
  const upstreamPath = segments.join("/");

  const targetUrl = new URL(
    upstreamPath,
    API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`,
  );

  const search = request.nextUrl.search;
  if (search) {
    targetUrl.search = search;
  }

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!DISALLOWED_REQUEST_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });
  // Node fetch auto-decompresses gzip/deflate/br but not zstd.
  headers.set("accept-encoding", "gzip, deflate, br");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (FORWARD_BODY_METHODS.has(request.method.toUpperCase())) {
    const body = await request.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
    }
  }

  try {
    const upstream = await fetch(targetUrl, init);

    const contentEncoding = upstream.headers.get("content-encoding");
    const bodyBuffer = await upstream.arrayBuffer();
    const responseBody = decompressZstdIfNeeded(bodyBuffer, contentEncoding);
    const responseHeaders = new Headers();
    upstream.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (HOP_BY_HOP_HEADERS.has(lower)) return;
      if (lower === "content-encoding" || lower === "content-length") return;
      responseHeaders.set(key, value);
    });

    return new NextResponse(responseBody, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    return Response.json(
      { message: "Unable to reach upstream service." },
      { status: 502 },
    );
  }
}

export {
  proxy as GET,
  proxy as POST,
  proxy as PUT,
  proxy as PATCH,
  proxy as DELETE,
  proxy as OPTIONS,
  proxy as HEAD,
};
