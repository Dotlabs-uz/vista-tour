"use client";

import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { TourSearchStartInput, TourSearchResults } from "@/lib/tourvisor/schemas";

type StartResponse = {
  requestId: string | null;
  tourvisor: unknown;
};

const POLL_STATUSES = new Set([
  "running",
  "in_progress",
  "processing",
  "searching",
  "pending",
]);
const DONE_STATUSES = new Set(["done", "completed", "complete", "finished", "success"]);
const FAIL_STATUSES = new Set(["error", "failed", "fail"]);

function shouldPoll(status: string | null | undefined) {
  if (!status) return true; // unknown -> keep polling briefly
  const s = status.toLowerCase();
  if (DONE_STATUSES.has(s) || FAIL_STATUSES.has(s)) return false;
  if (POLL_STATUSES.has(s)) return true;
  return true;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;
  if (!res.ok) {
    const err = (data as any)?.error ?? "Request failed.";
    const details = (data as any)?.details;
    const status = (data as any)?.status;
    throw new Error(
      [err, details ? `Details: ${details}` : null, status ? `Status: ${status}` : null]
        .filter(Boolean)
        .join(" "),
    );
  }
  return data as T;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;
  if (!res.ok) {
    const err = (data as any)?.error ?? "Request failed.";
    const details = (data as any)?.details;
    const status = (data as any)?.status;
    throw new Error(
      [err, details ? `Details: ${details}` : null, status ? `Status: ${status}` : null]
        .filter(Boolean)
        .join(" "),
    );
  }
  return data as T;
}

export function useTourSearch() {
  const [requestId, setRequestId] = useState<string | null>(null);
  const pollStartRef = useRef<number | null>(null);

  const startMutation = useMutation({
    mutationFn: async (input: TourSearchStartInput) =>
      postJson<StartResponse>("/api/tourvisor/search/start", input),
    onSuccess: (data) => {
      setRequestId(data.requestId);
      pollStartRef.current = Date.now();
    },
  });

  const resultsQuery = useQuery({
    queryKey: useMemo(() => ["tourvisorResults", requestId], [requestId]),
    enabled: Boolean(requestId),
    queryFn: async () => {
      const rid = requestId!;
      return getJson<TourSearchResults>(
        `/api/tourvisor/search/results?requestId=${encodeURIComponent(rid)}`,
      );
    },
    refetchInterval: (q) => {
      const maxMs = 60_000;
      const startedAt = pollStartRef.current;
      const elapsed = startedAt ? Date.now() - startedAt : 0;
      if (elapsed > maxMs) return false;
      return shouldPoll(q.state.data?.status) ? 1500 : false;
    },
  });

  return {
    requestId,
    startSearch: startMutation.mutate,
    startSearchAsync: startMutation.mutateAsync,
    startStatus: startMutation.status,
    startError: startMutation.error,
    resultsQuery,
    reset: () => {
      setRequestId(null);
      pollStartRef.current = null;
    },
  };
}


