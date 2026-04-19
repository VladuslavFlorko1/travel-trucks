"use client";

import { useCampers } from "@/hooks/useCampers";
import { Camper } from "@/types/camper";
import { useSearchParams } from "next/navigation";
import Filters from "@/components/Catalog/Filters/Filters";
import CamperCard from "@/components/Catalog/CamperCard/CamperCard";
import styles from "./Catalog.module.css";

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
    return <div className={styles.state}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.state}>{(error as Error).message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Filters />
        </aside>

        <div className={styles.content}>
          <div className={styles.cardsList}>
            {data.pages.map((page, pageIndex) => (
              <div key={pageIndex} className={styles.pageGroup}>
                {page.campers.map((camper: Camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>
            ))}
          </div>

          {hasNextPage && (
            <div className={styles.loadMoreWrap}>
              <button
                type="button"
                className={styles.loadMoreBtn}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}