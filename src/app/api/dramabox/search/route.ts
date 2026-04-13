import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1") + "/dramabox";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || searchParams.get("q");

  if (!query) {
    return encryptedResponse([]);
  }

  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const queryParams = [
    `query=${encodeURIComponent(query)}`,
    page ? `page=${encodeURIComponent(page)}` : null,
    size ? `size=${encodeURIComponent(size)}` : null,
  ]
    .filter(Boolean)
    .join("&");

  try {
    const response = await upstreamFetch(
      `${UPSTREAM_API}/search?${queryParams}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await safeJson(response);

    // Filter out non-drama results (e.g. type:"actor") that have no bookId
    const filtered = Array.isArray(data)
      ? data.filter((item: any) => item.bookId)
      : data;

    return encryptedResponse(filtered);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

