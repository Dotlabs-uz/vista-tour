import { z } from "zod";

export const TourSearchStartInputSchema = z.object({
  departureCountryId: z.number().int().optional().default(4),
  departureCity: z.string().trim().min(1).optional(),
  departureCityId: z.number().int().optional(),

  destination: z.string().trim().min(1).optional(),
  destinationCountryId: z.number().int().optional(),

  dateFrom: z.string().trim().min(1).optional(),
  dateTo: z.string().trim().min(1).optional(),

  adults: z.number().int().min(1).optional().default(2),
  children: z.number().int().min(0).optional().default(0),

  raw: z.record(z.unknown()).optional(),
});

export type TourSearchStartInput = z.infer<typeof TourSearchStartInputSchema>;

export const TourCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  hotelName: z.string().nullable(),
  hotelStars: z.number().nullable(),
  price: z.number().nullable(),
  currency: z.string().nullable(),
  dateFrom: z.string().nullable(),
  dateTo: z.string().nullable(),
  nights: z.number().nullable(),
  operatorName: z.string().nullable(),
  meal: z.string().nullable(),
  imageUrl: z.string().nullable(),
  deepLink: z.string().nullable(),
});

export type TourCard = z.infer<typeof TourCardSchema>;

export const TourSearchResultsSchema = z.object({
  requestId: z.string(),
  status: z.string().nullable(),
  tours: z.array(TourCardSchema),
  tourvisor: z.unknown(),
});

export type TourSearchResults = z.infer<typeof TourSearchResultsSchema>;


