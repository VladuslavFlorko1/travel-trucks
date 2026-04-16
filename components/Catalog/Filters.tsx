"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/catalog?${params.toString()}`);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilter("location", event.target.value);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFilter(event.target.name, event.target.value);
  };
  const resetFilters = () => {
    router.push("/catalog");
  };

  return (
    <div>
      <input
        type="text"
        name="location"
        placeholder="Location"
        defaultValue={searchParams.get("location") || ""}
        onChange={handleLocationChange}
      />

      <div>
        <p>Form</p>
        <label>
          <input
            type="radio"
            name="form"
            value="alcove"
            checked={searchParams.get("form") === "alcove"}
            onChange={handleRadioChange}
          />
          Alcove
        </label>

        <label>
          <input
            type="radio"
            name="form"
            value="panel_van"
            checked={searchParams.get("form") === "panel_van"}
            onChange={handleRadioChange}
          />
          Panel van
        </label>

        <label>
          <input
            type="radio"
            name="form"
            value="integrated"
            checked={searchParams.get("form") === "integrated"}
            onChange={handleRadioChange}
          />
          Integrated
        </label>
      </div>

      <div>
        <p>Engine</p>
        <label>
          <input
            type="radio"
            name="engine"
            value="petrol"
            checked={searchParams.get("engine") === "petrol"}
            onChange={handleRadioChange}
          />
          Petrol
        </label>

        <label>
          <input
            type="radio"
            name="engine"
            value="diesel"
            checked={searchParams.get("engine") === "diesel"}
            onChange={handleRadioChange}
          />
          Diesel
        </label>

        <label>
          <input
            type="radio"
            name="engine"
            value="hybrid"
            checked={searchParams.get("engine") === "hybrid"}
            onChange={handleRadioChange}
          />
          Hybrid
        </label>
      </div>

      <div>
        <p>Transmission</p>
        <label>
          <input
            type="radio"
            name="transmission"
            value="automatic"
            checked={searchParams.get("transmission") === "automatic"}
            onChange={handleRadioChange}
          />
          Automatic
        </label>

        <label>
          <input
            type="radio"
            name="transmission"
            value="manual"
            checked={searchParams.get("transmission") === "manual"}
            onChange={handleRadioChange}
          />
          Manual
        </label>
        </div>
        <button type="button" onClick={resetFilters}>
            Reset filters
        </button>      
    </div>
  );
}
