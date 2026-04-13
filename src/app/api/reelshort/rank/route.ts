import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";
import { NextResponse, type NextRequest } from "next/server";

const UPSTREAM_API = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1") + "/reelshort";

function slugifyText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function addFilteredTitleId(data: any) {
  if (!data || typeof data !== "object") return data;

  const transformItem = (item: any) => {
    if (!item || typeof item !== "object") return item;
    if (!item.id) {
      const title = item.book_title || item.bookTitle || item.title || item.name || "";
      if (title) {
        item.id = slugifyText(title);
      }
    }
    return item;
  };

  const transformList = (list: any) => {
    if (Array.isArray(list)) return list.map(transformItem);
    return list;
  };

  if (Array.isArray(data)) {
    return data.map(transformItem);
  }

  if (data.items && Array.isArray(data.items)) {
    data.items = data.items.map(transformItem);
  }

  if (data.books && Array.isArray(data.books)) {
    data.books = data.books.map(transformItem);
  }

  if (data.data) {
    if (data.data.items && Array.isArray(data.data.items)) {
      data.data.items = data.data.items.map(transformItem);
    }
    if (data.data.books && Array.isArray(data.data.books)) {
      data.data.books = data.data.books.map(transformItem);
    }
    if (data.data.lists && Array.isArray(data.data.lists)) {
      data.data.lists = data.data.lists.map((list: any) => {
        if (list.books && Array.isArray(list.books)) {
          list.books = list.books.map(transformItem);
        }
        return list;
      });
    }
  }

  return data;
}

export async function GET(request: NextRequest) {
  try {
    const response = await upstreamFetch(`${UPSTREAM_API}/rank`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch rank data" },
        { status: response.status }
      );
    }

    const data = await safeJson(response);
    return encryptedResponse(addFilteredTitleId(data));
  } catch (error) {
    console.error("ReelShort Rank Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
