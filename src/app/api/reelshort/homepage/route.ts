import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { NextResponse } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1") + "/reelshort";

function slugifyText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function transformReelShortRankToHomepage(data: any) {
  const sections = data?.data?.sections || [];

  const tab_list = sections.map((section: any, index: number) => ({
    tab_id: index + 1,
    tab_name: section.name || `Section ${index + 1}`,
    last_modified_time: Date.now(),
    tab_md5: "",
    sort: index + 1,
  }));

  const lists = sections.map((section: any, index: number) => ({
    bs_id: index + 1,
    tab_id: index + 1,
    ui_style: 1,
    banners: [],
    books: (section.items || []).map((item: any) => ({
      book_id: item.id || item.filteredTitle || slugifyText(item.title || item.name || ""),
      book_title: item.title || item.book_title || item.name || "",
      book_pic: item.cover || item.book_pic || "",
      special_desc: item.description || item.special_desc || "",
      chapter_count: item.episode ?? item.chapter_count ?? 0,
      theme: Array.isArray(item.theme) ? item.theme : item.type ? [String(item.type)] : [],
      book_mark: item.book_mark,
      rank_level: item.rank_level,
    })),
    display_play_num: false,
    display_theme: false,
    last_book_id: section.items?.[section.items.length - 1]?.id,
  }));

  return {
    success: true,
    data: {
      hall_id: data?.data?.hall_id ?? 0,
      search_keyword_list: data?.data?.search_keyword_list ?? [],
      tabs_md5: data?.data?.tabs_md5 ?? "",
      tab_list,
      lists,
    },
  };
}

export async function GET() {
  try {
    const response = await upstreamFetch(`${UPSTREAM_API}/rank`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch ReelShort rank data" },
        { status: response.status }
      );
    }

    const data = await safeJson(response);
    const transformed = transformReelShortRankToHomepage(data);
    return encryptedResponse(transformed);
  } catch (error) {
    console.error("ReelShort Homepage Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

