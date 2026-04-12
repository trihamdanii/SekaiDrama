import { NextResponse, type NextRequest } from "next/server";

const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 1000;

const rateLimitStore = new Map<string, { count: number; startTime: number }>();

function getClientKey(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key")?.trim() || request.nextUrl.searchParams.get("api_key")?.trim();
  if (apiKey) {
    return `key:${apiKey}`;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "127.0.0.1";
  return `anon:${ip === "::1" ? "127.0.0.1" : ip}`;
}

function createRateLimitHeaders(count: number, startTime: number) {
  const resetTime = Math.floor((startTime + WINDOW_MS) / 1000);
  return {
    "X-RateLimit-Limit": RATE_LIMIT.toString(),
    "X-RateLimit-Remaining": Math.max(RATE_LIMIT - count, 0).toString(),
    "X-RateLimit-Reset": resetTime.toString(),
  };
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const shouldRateLimit = pathname.startsWith("/api") || pathname.startsWith("/public/api/v1");
  if (!shouldRateLimit) {
    return NextResponse.next();
  }

  const key = getClientKey(request);
  const now = Date.now();

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 0, startTime: now });
  }

  const entry = rateLimitStore.get(key)!;
  if (now - entry.startTime > WINDOW_MS) {
    entry.count = 0;
    entry.startTime = now;
  }

  entry.count += 1;
  const headers = createRateLimitHeaders(entry.count, entry.startTime);

  if (entry.count > RATE_LIMIT) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Too Many Requests",
        error: "Rate limit terlampaui. Mohon tunggu beberapa saat.",
      }),
      {
        status: 429,
        headers: {
          "content-type": "application/json",
          ...headers,
        },
      }
    );
  }

  const response = NextResponse.next();
  Object.entries(headers).forEach(([name, value]) => response.headers.set(name, value));
  return response;
}

export const config = {
  matcher: ["/api/:path*", "/public/api/v1/:path*"],
};
