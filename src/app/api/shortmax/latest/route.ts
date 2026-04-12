import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { optimizeCover } from "@/lib/image-utils";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1") + "/shortmax";

export async function GET() {
  try {
    const response = await upstreamFetch(`${UPSTREAM_API}/latest`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return encryptedResponse({ success: false, data: [] });
    }

    const data = await safeJson<any>(response);

    const dramas = (data.results || []).map((item: any) => ({
      shortPlayId: item.shortPlayId,
      title: item.name,
      cover: optimizeCover(item.cover),
      totalEpisodes: item.totalEpisodes || 0,
      label: item.label || "",
      collectNum: item.collectNum || 0,
    }));

    return encryptedResponse({
      success: true,
      data: dramas,
      total: data.total || dramas.length,
    });
  } catch (error) {
    console.error("ShortMax Latest Error:", error);
    return encryptedResponse({ success: false, data: [] });
  }
}
