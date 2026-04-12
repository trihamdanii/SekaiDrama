import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1";
    const queryString = request.nextUrl.searchParams.toString();
    const response = await upstreamFetch(`${baseUrl}/freereels/episodes${queryString ? `?${queryString}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch episodes" }, { status: response.status });
    }

    const data = await safeJson(response);
    return encryptedResponse(data);
  } catch (error) {
    console.error("FreeReels Episodes Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
