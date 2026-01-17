import { z } from "zod";

type Json = unknown;

export class TourvisorError extends Error {
  status: number | null;
  payload: Json | null;

  constructor(message: string, opts: { status?: number | null; payload?: Json | null } = {}) {
    super(message);
    this.name = "TourvisorError";
    this.status = opts.status ?? null;
    this.payload = opts.payload ?? null;
  }
}

function env(name: string) {
  const v = process.env[name];
  return v && v.trim().length ? v.trim() : undefined;
}

const ClientConfigSchema = z.object({
  baseUrl: z.string().default("https://api.tourvisor.ru"),
  jwt: z.string().min(1),
  timeoutMs: z.number().int().positive().default(15000),
  apiKeyHeaderName: z.string().min(1).default("X-API-Key"),
  sendApiKeyHeader: z.boolean().default(true),
});

function getClientConfig() {
  const parsed = ClientConfigSchema.safeParse({
    baseUrl: env("TOURVISOR_BASE_URL") ?? "https://api.tourvisor.ru",
    jwt: env("TOURVISOR_JWT"),
    timeoutMs: Number(env("TOURVISOR_TIMEOUT_MS") ?? "15000"),
    apiKeyHeaderName: env("TOURVISOR_API_KEY_HEADER") ?? "X-API-Key",
    sendApiKeyHeader: (env("TOURVISOR_SEND_API_KEY_HEADER") ?? "true").toLowerCase() !== "false",
  });
  if (!parsed.success) {
    throw new TourvisorError("Missing/invalid Tourvisor env config (TOURVISOR_JWT).");
  }
  return parsed.data;
}

export async function tourvisorFetchJson<T = unknown>(opts: {
  path: string;
  method?: "GET" | "POST";
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
}): Promise<T> {
  const cfg = getClientConfig();
  const url = new URL(opts.path, cfg.baseUrl);
  for (const [k, v] of Object.entries(opts.query ?? {})) {
    if (v === undefined || v === null) continue;
    url.searchParams.set(k, String(v));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), cfg.timeoutMs);

  try {
    const authHeaders: Record<string, string> = {
      // Docs say: Authorization: Bearer <JWT>
      Authorization: `Bearer ${cfg.jwt}`,
    };
    // In the swagger sections, auth is labeled "ApiKeyAuth".
    // Some gateways accept the same JWT as an api-key header too.
    if (cfg.sendApiKeyHeader) {
      authHeaders[cfg.apiKeyHeaderName] = cfg.jwt;
    }

    const res = await fetch(url.toString(), {
      method: opts.method ?? "GET",
      headers: {
        ...authHeaders,
        Accept: "application/json",
        ...(opts.body ? { "Content-Type": "application/json" } : {}),
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") ?? "";
    const text = await res.text();
    const trimmed = text.trim();
    const looksJson =
      contentType.toLowerCase().includes("application/json") ||
      trimmed.startsWith("{") ||
      trimmed.startsWith("[");

    let payload: unknown = null;
    if (trimmed.length) {
      if (looksJson) {
        try {
          payload = JSON.parse(text) as unknown;
        } catch (e) {
          const msg = e instanceof Error ? e.message : "JSON parse error";
          throw new TourvisorError(`Tourvisor returned invalid JSON. ${msg}`, {
            status: res.status,
            payload: {
              contentType,
              responseSnippet: trimmed.slice(0, 800),
            },
          });
        }
      } else {
        payload = {
          contentType,
          responseSnippet: trimmed.slice(0, 800),
        };
      }
    } else {
      payload = {
        contentType,
        responseSnippet: "",
      };
    }

    if (!res.ok) {
      throw new TourvisorError("Tourvisor request failed.", {
        status: res.status,
        payload: {
          url: url.toString(),
          statusText: res.statusText,
          ...((payload && typeof payload === "object") ? (payload as object) : { payload }),
        },
      });
    }

    return payload as T;
  } catch (e) {
    if (e instanceof TourvisorError) throw e;
    const msg = e instanceof Error ? e.message : "Unknown Tourvisor fetch error.";
    throw new TourvisorError(msg, { status: null, payload: null });
  } finally {
    clearTimeout(timeout);
  }
}


