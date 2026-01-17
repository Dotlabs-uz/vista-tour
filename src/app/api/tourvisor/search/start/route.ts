import { NextResponse } from "next/server";
import { TourSearchStartInputSchema } from "@/lib/tourvisor/schemas";
import { tourvisorFetchJson, TourvisorError } from "@/lib/tourvisor/client";

export const runtime = "nodejs";

type Departure = { id: number; name: string; nameGenitive?: string };
type Country = { id: number; name: string };

let departuresCache:
  | { key: string; fetchedAt: number; items: Departure[] }
  | null = null;
let countriesCache:
  | { key: string; fetchedAt: number; items: Country[] }
  | null = null;

const CACHE_MS = 10 * 60 * 1000;

async function getDepartures(departureCountryId: number): Promise<Departure[]> {
  const key = String(departureCountryId);
  const now = Date.now();
  if (departuresCache && departuresCache.key === key && now - departuresCache.fetchedAt < CACHE_MS) {
    return departuresCache.items;
  }

  const data = await tourvisorFetchJson<unknown>({
    path: "/search/api/v1/departures",
    method: "GET",
    query: { departureCountryId },
  });

  const items = Array.isArray(data) ? (data as Departure[]) : [];
  departuresCache = { key, fetchedAt: now, items };
  return items;
}

async function getCountries(departureId: number): Promise<Country[]> {
  const key = String(departureId);
  const now = Date.now();
  if (countriesCache && countriesCache.key === key && now - countriesCache.fetchedAt < CACHE_MS) {
    return countriesCache.items;
  }

  const data = await tourvisorFetchJson<unknown>({
    path: "/search/api/v1/countries",
    method: "GET",
    query: { departureId },
  });

  const items = Array.isArray(data) ? (data as Country[]) : [];
  countriesCache = { key, fetchedAt: now, items };
  return items;
}

function findByName<T extends { name: string }>(items: T[], name: string): T | null {
  const n = name.trim().toLowerCase();
  if (!n) return null;
  return (
    items.find((x) => x.name.trim().toLowerCase() === n) ??
    items.find((x) => x.name.trim().toLowerCase().includes(n)) ??
    null
  );
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = TourSearchStartInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request payload.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;

  // NOTE: Exact Tourvisor fields depend on your account/docs.
  // We keep a stable internal contract and allow overriding via `raw`.
  const departureCountryId = input.departureCountryId ?? 4;
  const departureCityName = input.departureCity ?? "Ташкент";

  // Resolve departureId if not provided
  let departureId: number | null = input.departureCityId ?? null;
  if (!departureId) {
    const deps = await getDepartures(departureCountryId);
    const dep = findByName(deps, departureCityName);
    departureId = dep?.id ?? null;
  }
  if (!departureId) {
    return NextResponse.json(
      {
        error: "Cannot resolve departureId. Provide departureCityId.",
        details: `Unknown departure city: ${departureCityName}`,
      },
      { status: 400 },
    );
  }

  // Resolve destination countryIds
  let countryIds: number[] | null = input.destinationCountryId ? [input.destinationCountryId] : null;
  if (!countryIds && input.destination) {
    const countries = await getCountries(departureId);
    const c = findByName(countries, input.destination);
    if (c) countryIds = [c.id];
  }

  // Build query for Tourvisor tour-search
  const tvQuery: Record<string, string | number | boolean | undefined | null> = {
    departureId,
    dateFrom: input.dateFrom,
    dateTo: input.dateTo,
    adults: input.adults,
    currency: "UZS",
    onlyCharter: false,
  };

  // API expects array in query. We'll pass as repeated params: countryIds=1&countryIds=2...
  // tourvisorFetchJson only supports object now; so we include comma-separated and also allow raw override.
  if (countryIds?.length) tvQuery.countryIds = countryIds.join(",");

  if (input.children && input.children > 0) {
    tvQuery.children = input.children;
  }

  const raw = input.raw ?? {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
      tvQuery[k] = v;
    }
  }

  try {
    // From docs: tour-search is under /search/api/v1/tour-search (GET)
    const startPath = process.env.TOURVISOR_SEARCH_START_PATH ?? "/search/api/v1/tour-search";
    const data = await tourvisorFetchJson({
      path: startPath,
      method: "GET",
      query: tvQuery,
    });

    const asAny = (data ?? {}) as Record<string, unknown>;
    const requestId =
      (asAny.requestId as string | undefined) ??
      (asAny.request_id as string | undefined) ??
      (asAny.requestid as string | undefined) ??
      (asAny.id as string | undefined);

    return NextResponse.json(
      {
        requestId: requestId ?? null,
        tourvisor: data,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof TourvisorError) {
      return NextResponse.json(
        {
          error: "Tourvisor start search failed.",
          status: e.status,
          details: e.message,
          tourvisor: e.payload,
        },
        { status: 502 },
      );
    }
    const msg = e instanceof Error ? e.message : "Unknown Tourvisor error.";
    return NextResponse.json(
      { error: "Tourvisor start search failed.", details: msg },
      { status: 502 },
    );
  }
}


