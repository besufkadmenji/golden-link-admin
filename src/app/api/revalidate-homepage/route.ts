import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const HOMEPAGE_REVALIDATION_URL = process.env.HOMEPAGE_REVALIDATION_URL;
const HOMEPAGE_REVALIDATION_SECRET = process.env.HOMEPAGE_REVALIDATION_SECRET;

export async function POST() {
  if (!HOMEPAGE_REVALIDATION_URL || !HOMEPAGE_REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "Homepage revalidation is not configured." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(HOMEPAGE_REVALIDATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HOMEPAGE_REVALIDATION_SECRET}`,
      },
      body: JSON.stringify({ secret: HOMEPAGE_REVALIDATION_SECRET }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      return NextResponse.json(
        {
          message:
            payload?.message ?? "Homepage revalidation request was rejected.",
        },
        { status: response.status },
      );
    }

    const payload = (await response.json().catch(() => null)) as
      | Record<string, unknown>
      | null;

    return NextResponse.json({
      revalidated: true,
      ...(payload ?? {}),
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach homepage revalidation endpoint." },
      { status: 502 },
    );
  }
}
