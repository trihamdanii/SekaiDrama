import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1") + "/reelshort";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get("bookId") || searchParams.get("id");
    const episodeNumber = searchParams.get("episodeNumber");
    const chapterId = searchParams.get("chapterId");
    const filteredTitle = searchParams.get("filteredTitle");

    if (!bookId || (!episodeNumber && (!chapterId || !filteredTitle))) {
      return encryptedResponse(
        {
          error:
            "bookId and either episodeNumber or both chapterId and filteredTitle are required",
        },
        400
      );
    }

    const url = new URL(`${UPSTREAM_API}/episodes`);
    url.searchParams.set("id", bookId);
    if (episodeNumber) {
      url.searchParams.set("episodeNumber", episodeNumber);
    }
    if (chapterId) {
      url.searchParams.set("chapterId", chapterId);
    }
    if (filteredTitle) {
      url.searchParams.set("filteredTitle", filteredTitle);
    }

    const response = await upstreamFetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return encryptedResponse(
        { error: "Failed to fetch episode" },
        response.status
      );
    }

    const data = await safeJson(response);
    return encryptedResponse(data);
  } catch (error) {
    console.error("ReelShort Episode Error:", error);
    return encryptedResponse(
      { error: "Internal Server Error" },
      500
    );
  }
}

