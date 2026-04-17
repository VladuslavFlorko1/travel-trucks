"use client";

import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCampersFilters } from "@/hooks/useCampersFilters";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useCampersFilters();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [form, setForm] = useState(searchParams.get("form") || "");
  const [engine, setEngine] = useState(searchParams.get("engine") || "");
  const [transmission, setTransmission] = useState(
    searchParams.get("transmission") || ""
  );


  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (form) {
      params.set("form", form);
    }

    if (engine) {
      params.set("engine", engine);
    }

    if (transmission) {
      params.set("transmission", transmission);
    }

    router.push(`/catalog?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");
    router.push("/catalog");
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  if (isLoading) {
    return <div>Loading filters...</div>;
  }

  if (isError || !data) {
    return <div>Failed to load filters</div>;
  }

  return (
    <div>
      <p>Location</p>
      <input
        type="text"
        name="location"
        placeholder="Kyiv, Ukraine"
        value={location}
        onChange={handleLocationChange}
      />

      <div>
        <h2>Filters</h2>

        <div>
          <p>Camper form</p>
          {data.forms.map(item => (
            <label key={item}>
              <input
                type="radio"
                name="form"
                value={item}
                checked={form === item}
                onChange={event => setForm(event.target.value)}
              />
              {item}
            </label>
          ))}
        </div>

        <div>
          <p>Engine</p>
          {data.engines.map(item => (
            <label key={item}>
              <input
                type="radio"
                name="engine"
                value={item}
                checked={engine === item}
                onChange={event => setEngine(event.target.value)}
              />
              {item}
            </label>
          ))}
        </div>

        <div>
          <p>Transmission</p>
          {data.transmissions.map(item => (
            <label key={item}>
              <input
                type="radio"
                name="transmission"
                value={item}
                checked={transmission === item}
                onChange={event => setTransmission(event.target.value)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <button type="button" onClick={handleApplyFilters}>
        Search
      </button>

      <button type="button" onClick={handleClearFilters}>
        Clear filters
      </button>
    </div>
  );
}