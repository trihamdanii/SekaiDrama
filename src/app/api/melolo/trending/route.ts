import { upstreamFetch } from "@/lib/upstream";

import { type NextRequest } from "next/server";
import { encryptedResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1";
    const response = await upstreamFetch(`${baseUrl}/melolo/trending`);
    const data = await response.json();
    return encryptedResponse(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return encryptedResponse({ error: message }, 500);
  }
}
