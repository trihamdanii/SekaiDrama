import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { upstreamFetch } from "@/lib/upstream";

import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || searchParams.get("q");

  if (!query) {
    return encryptedResponse({ code: 0, data: { search_data: [{ books: [] }] } });
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1";
    const response = await upstreamFetch(`${baseUrl}/melolo/rank`, { cache: "no-store" });

    if (!response.ok) {
      return encryptedResponse({ code: response.status, data: { search_data: [{ books: [] }] } }, response.status);
    }

    const data = await safeJson<any>(response);
    const books = Array.isArray(data?.books) ? data.books : [];
    const queryText = query.trim().toLowerCase();

    const filteredBooks = books.filter((book: any) => {
      const bookName = String(book.book_name || "").toLowerCase();
      const author = String(book.author || "").toLowerCase();
      const abstract = String(book.abstract || "").toLowerCase();
      return (
        bookName.includes(queryText) ||
        author.includes(queryText) ||
        abstract.includes(queryText)
      );
    });

    return encryptedResponse({
      code: 0,
      data: {
        search_data: [
          {
            books: filteredBooks,
          },
        ],
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Melolo Search Error:", error);
    return encryptedResponse({ code: 500, data: { search_data: [{ books: [] }] } }, 500);
  }
}
