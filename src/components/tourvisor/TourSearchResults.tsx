"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTourSearchContext } from "@/components/tourvisor/TourSearchProvider";

function formatPrice(price: number | null, currency: string | null) {
  if (price === null) return "Цена не указана";
  const cur = currency ?? "UZS";
  try {
    return new Intl.NumberFormat("ru-RU").format(price) + ` ${cur}`;
  } catch {
    return `${price} ${cur}`;
  }
}

export function TourSearchResults() {
  const { requestId, resultsQuery, reset } = useTourSearchContext();

  const isLoading = resultsQuery.isLoading || resultsQuery.isFetching;
  const error = resultsQuery.error instanceof Error ? resultsQuery.error.message : null;
  const data = resultsQuery.data;
  const tours = data?.tours ?? [];

  return (
    <section id="tour-search-results" className="container mx-auto px-4 py-10 md:py-14">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            Результаты поиска
          </h2>
          {requestId && (
            <p className="text-sm text-muted-foreground mt-1">
              requestId: <span className="font-mono">{requestId}</span>
              {data?.status ? ` • status: ${data.status}` : null}
            </p>
          )}
        </div>
        {requestId && (
          <Button variant="outline" onClick={reset}>
            Сбросить
          </Button>
        )}
      </div>

      {!requestId && (
        <p className="text-muted-foreground">
          Заполните параметры и нажмите “Найти туры”.
        </p>
      )}

      {requestId && error && (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Ошибка Tourvisor</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-destructive/90 whitespace-pre-wrap">
            {error}
          </CardContent>
        </Card>
      )}

      {requestId && isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-muted" />
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {requestId && !isLoading && !error && data && tours.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Пока нет туров</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Поиск ещё выполняется или по выбранным параметрам ничего не найдено.
          </CardContent>
        </Card>
      )}

      {requestId && !error && tours.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((t) => (
            <Card key={t.id} className="overflow-hidden">
              {t.imageUrl ? (
                <div className="relative h-44 bg-muted">
                  <Image
                    src={t.imageUrl}
                    alt={t.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-44 bg-muted" />
              )}
              <CardHeader>
                <CardTitle className="text-base">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-bold">
                  {formatPrice(t.price, t.currency)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.dateFrom ? `С ${t.dateFrom}` : null}
                  {t.dateTo ? ` по ${t.dateTo}` : null}
                  {t.nights ? ` • ${t.nights} ноч.` : null}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.meal ? `Питание: ${t.meal}` : null}
                  {t.operatorName ? ` • ${t.operatorName}` : null}
                </div>
                {t.deepLink ? (
                  <Button asChild className="w-full mt-2">
                    <a href={t.deepLink} target="_blank" rel="noopener noreferrer">
                      Открыть тур
                    </a>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}


