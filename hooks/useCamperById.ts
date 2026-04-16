"use client";

import { useQuery } from "@tanstack/react-query";
import { getCamperById } from "@/lib/api/campers";

export function useCamperById(id: string) {
  return useQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
    enabled: !!id,
  });
}