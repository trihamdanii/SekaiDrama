import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1") + "/reelshort";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
  const bookId = searchParams.get("bookId") || searchParams.get("id");

  if (!bookId) {
      return encryptedResponse(
        { error: "bookId or id is required" },
        400
      );
  }

  const response = await upstreamFetch(
      `${UPSTREAM_API}/detail?id=${encodeURIComponent(bookId)}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return encryptedResponse(
        { error: "Failed to fetch detail" },
        response.status
      );
    }

    const data = await safeJson(response);
    return encryptedResponse(data);
  } catch (error) {
    console.error("ReelShort Detail Error:", error);
    return encryptedResponse(
      { error: "Internal Server Error" },
      500
    );
  }
}

