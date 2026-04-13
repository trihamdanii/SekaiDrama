export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.cutad.web.id/public/api/v1";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "cutad_431e4ba1cc86a4b6ad6e668e4a857f8604228f81aadc42b7";

export function getUpstreamHeaders(init?: RequestInit["headers"]): HeadersInit {
  const headers = new Headers(init as HeadersInit | undefined);

  if (API_KEY && !headers.has("x-api-key") && !headers.has("X-API-Key")) {
    headers.set("x-api-key", API_KEY);
  }

  return headers;
}

function addApiKeyQueryParam(input: RequestInfo): RequestInfo {
  if (!API_KEY) return input;

  if (typeof input === "string") {
    const url = new URL(input);
    if (!url.searchParams.has("api_key")) {
      url.searchParams.set("api_key", API_KEY);
    }
    return url.toString();
  }

  if (input instanceof URL) {
    if (!input.searchParams.has("api_key")) {
      input.searchParams.set("api_key", API_KEY);
    }
    return input;
  }

  if (input instanceof Request) {
    const url = new URL(input.url);
    if (!url.searchParams.has("api_key")) {
      url.searchParams.set("api_key", API_KEY);
    }
    return url.toString();
  }

  return input;
}

export async function upstreamFetch(input: RequestInfo, init: RequestInit = {}) {
  const headers = getUpstreamHeaders(init.headers);
  const requestInput = addApiKeyQueryParam(input);

  const initWithHeaders: RequestInit = {
    ...init,
    headers,
  };

  return fetch(requestInput, initWithHeaders);
}
