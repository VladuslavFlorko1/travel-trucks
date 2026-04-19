"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api/campers";
import { Filters } from "@/types/filters";

export function useCampers(filters: Filters) {
  return useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      getCampers({ pageParam, perPage: 4, filters }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page >= lastPage.totalPages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}