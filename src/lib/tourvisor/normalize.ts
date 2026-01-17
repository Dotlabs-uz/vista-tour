import type { TourCard } from "./schemas";

function pickFirst<T>(...vals: Array<T | undefined | null>): T | null {
  for (const v of vals) {
    if (v !== undefined && v !== null) return v;
  }
  return null;
}

function asNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/\s/g, ""));
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function asString(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return null;
}

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v && typeof v === "object" && !Array.isArray(v)) return v as Record<string, unknown>;
  return null;
}

function findArrayCandidate(root: unknown): unknown[] {
  if (Array.isArray(root)) return root;
  const r = asRecord(root);
  if (!r) return [];

  const candidates: unknown[] = [
    r.tours,
    r.items,
    r.results,
    r.offers,
    r.data,
    r.result,
    r.response,
  ];

  for (const c of candidates) {
    if (Array.isArray(c)) return c;
    if (asRecord(c)) {
      const rr = c as Record<string, unknown>;
      for (const k of ["tours", "items", "results", "offers", "data"]) {
        if (Array.isArray(rr[k])) return rr[k] as unknown[];
      }
    }
  }

  return [];
}

export function normalizeStatusFromUnknown(data: unknown): string | null {
  const r = asRecord(data);
  if (!r) return null;
  const status =
    pickFirst(
      asString(r.status),
      asString(r.state),
      asString(r.searchStatus),
      asString(r.search_status),
    ) ?? null;
  return status;
}

export function normalizeToursFromUnknown(data: unknown): TourCard[] {
  const arr = findArrayCandidate(data);
  if (!arr.length) return [];

  return arr
    .map((item, idx): TourCard | null => {
      const r = asRecord(item);
      if (!r) return null;

      const id =
        pickFirst(
          asString(r.id),
          asString(r.offerId),
          asString(r.offer_id),
          asString(r.tourId),
          asString(r.tour_id),
        ) ?? String(idx);

      const hotel = asRecord(r.hotel) ?? null;
      const operator = asRecord(r.operator) ?? null;

      const hotelName =
        pickFirst(asString(r.hotelName), hotel ? asString(hotel.name) : null) ?? null;
      const hotelStars =
        asNumber(pickFirst(r.hotelStars, hotel ? hotel.stars : null)) ?? null;

      const price =
        asNumber(
          pickFirst(
            r.price,
            r.totalPrice,
            r.total_price,
            r.minPrice,
            r.min_price,
            r.cost,
          ),
        ) ?? null;

      const currency =
        pickFirst(asString(r.currency), asString(r.curr), asString(r.currencyCode)) ?? null;

      const dateFrom =
        pickFirst(asString(r.dateFrom), asString(r.date_from), asString(r.departureDate)) ??
        null;
      const dateTo =
        pickFirst(asString(r.dateTo), asString(r.date_to), asString(r.returnDate)) ?? null;

      const nights = asNumber(pickFirst(r.nights, r.night, r.duration)) ?? null;

      const operatorName =
        pickFirst(
          asString(r.operatorName),
          operator ? asString(operator.name) : null,
          asString(r.operator),
        ) ?? null;

      const meal =
        pickFirst(asString(r.meal), asString(r.board), asString(r.pansion)) ?? null;

      const imageUrl =
        pickFirst(
          asString(r.imageUrl),
          asString(r.image_url),
          asString(r.photo),
          hotel ? asString(hotel.imageUrl) : null,
          hotel ? asString(hotel.photo) : null,
        ) ?? null;

      const deepLink =
        pickFirst(
          asString(r.deepLink),
          asString(r.deeplink),
          asString(r.link),
          asString(r.url),
        ) ?? null;

      const titleParts = [
        hotelName ?? "Тур",
        hotelStars ? `${hotelStars}*` : null,
        operatorName ? `(${operatorName})` : null,
      ].filter(Boolean);

      return {
        id,
        title: titleParts.join(" "),
        hotelName,
        hotelStars,
        price,
        currency,
        dateFrom,
        dateTo,
        nights,
        operatorName,
        meal,
        imageUrl,
        deepLink,
      };
    })
    .filter((x): x is TourCard => Boolean(x));
}


