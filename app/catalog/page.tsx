"use client";

import { useCampers } from "@/hooks/useCampers";

type Camper = {
  id: string;
  name: string;
};

export default function Catalog() {
  const { data, isLoading, isError, error } = useCampers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{(error as Error).message}</div>;
  }

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.campers.map((camper: Camper) => (
            <div key={camper.id}>{camper.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
}