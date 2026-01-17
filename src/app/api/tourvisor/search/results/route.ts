import { NextResponse } from "next/server";
import { z } from "zod";
import { tourvisorFetchJson, TourvisorError } from "@/lib/tourvisor/client";
import {
  normalizeStatusFromUnknown,
  normalizeToursFromUnknown,
} from "@/lib/tourvisor/normalize";

export const runtime = "nodejs";

const QuerySchema = z.object({
  requestId: z.string().trim().min(1),
});

function env(name: string) {
  const v = process.env[name];
  return v && v.trim().length ? v.trim() : undefined;
}

export async function GET(req: Request) {
  // From docs (tour-search tag): results live under /search/api/v1/tour-search/results
  const resultsPath =
    env("TOURVISOR_SEARCH_RESULTS_PATH") ?? "/search/api/v1/tour-search/results";
  const resultsMethod = (env("TOURVISOR_SEARCH_RESULTS_METHOD") ?? "GET")
    .toUpperCase()
    .trim();

  const urlObj = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    requestId: urlObj.searchParams.get("requestId"),
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Missing or invalid requestId." },
      { status: 400 },
    );
  }

  const { requestId } = parsed.data;

  try {
    const data =
      resultsMethod === "POST"
        ? await tourvisorFetchJson({
            path: resultsPath,
            method: "POST",
            body: { requestId },
          })
        : await tourvisorFetchJson({
            path: resultsPath,
            method: "GET",
            query: { requestId },
          });

    const status = normalizeStatusFromUnknown(data);
    const tours = normalizeToursFromUnknown(data);

    return NextResponse.json(
      {
        requestId,
        status,
        tours,
        tourvisor: data,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof TourvisorError) {
      return NextResponse.json(
        {
          error: "Tourvisor get results failed.",
          status: e.status,
          details: e.message,
          tourvisor: e.payload,
        },
        { status: 502 },
      );
    }

    const msg = e instanceof Error ? e.message : "Unknown Tourvisor error.";
    return NextResponse.json(
      { error: "Tourvisor get results request failed.", details: msg },
      { status: 502 },
    );
  }
}


