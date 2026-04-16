"use client";

import { useQuery } from "@tanstack/react-query";
import { getCamperReviews } from "@/lib/api/campers";

export function useCamperReviews(camperId: string) {
  return useQuery({
    queryKey: ["camperReviews", camperId],
    queryFn: () => getCamperReviews(camperId),
    enabled: !!camperId,
  });
}