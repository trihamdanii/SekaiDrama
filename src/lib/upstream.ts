export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export function getUpstreamHeaders(init?: RequestInit["headers"]): HeadersInit {
  const headers = new Headers(init as HeadersInit | undefined);

  if (API_KEY && !headers.has("x-api-key") && !headers.has("X-API-Key")) {
    headers.set("x-api-key", API_KEY);
  }

  return headers;
}

export async function upstreamFetch(input: RequestInfo, init: RequestInit = {}) {
  const initWithHeaders: RequestInit = {
    ...init,
    headers: getUpstreamHeaders(init.headers),
  };

  return fetch(input, initWithHeaders);
}
