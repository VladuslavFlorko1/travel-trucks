"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api/campers";

export function useCampers() {
  return useInfiniteQuery({
    queryKey: ["campers"],
    queryFn: ({ pageParam }) => getCampers({ pageParam, limit: 4 }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page >= lastPage.totalPages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}