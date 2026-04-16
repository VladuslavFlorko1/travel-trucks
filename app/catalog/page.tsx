"use client";

import { useCampers } from "@/hooks/useCampers";
import { Camper } from "@/types/camper";
import { useSearchParams } from "next/navigation";
import Filters from "@/components/Catalog/Filters";
import CamperCard from "@/components/Catalog/CamperCard";

export default function Catalog() {
  const searchParams = useSearchParams();

  const filters = {
    location: searchParams.get("location") || "",
    form: searchParams.get("form") || "",
    engine: searchParams.get("engine") || "",
    transmission: searchParams.get("transmission") || "",
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCampers(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{(error as Error).message}</div>;
  }

  return (
    <div>
      <Filters />

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.campers.map((camper: Camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}