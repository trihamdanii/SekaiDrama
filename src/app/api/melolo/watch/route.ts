import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1") + "/melolo";

export async function GET(request: NextRequest) {
  try {
    const queryString = request.nextUrl.searchParams.toString();

    if (!queryString) {
      return NextResponse.json(
        { error: "Watch endpoint requires query parameters" },
        { status: 400 }
      );
    }

    const targetUrl = `${UPSTREAM_API}/watch?${queryString}`;
    const response = await upstreamFetch(targetUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch watch data" },
        { status: response.status }
      );
    }

    const data = await safeJson(response);
    return encryptedResponse(data);
  } catch (error) {
    console.error("Melolo Watch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
