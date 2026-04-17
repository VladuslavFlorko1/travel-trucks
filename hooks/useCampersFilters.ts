"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampersFilters } from "@/lib/api/campers";

export function useCampersFilters() {
  return useQuery({
    queryKey: ["campersFilters"],
    queryFn: getCampersFilters,
  });
}