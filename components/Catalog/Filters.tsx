"use client";

import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCampersFilters } from "@/hooks/useCampersFilters";
import styles from "./Filters.module.css";
import Image from "next/image";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useCampersFilters();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [form, setForm] = useState(searchParams.get("form") || "");
  const [engine, setEngine] = useState(searchParams.get("engine") || "");
  const [transmission, setTransmission] = useState(
    searchParams.get("transmission") || "",
  );

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (location.trim()) params.set("location", location.trim());
    if (form) params.set("form", form);
    if (engine) params.set("engine", engine);
    if (transmission) params.set("transmission", transmission);

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

  if (isLoading) return <p>Loading filters...</p>;
  if (isError || !data) return <p>Failed to load filters</p>;

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.label}>Location</p>

        <div className={styles.inputWrapper}>
          <Image
            src="/location.svg"
            alt="location"
            className={styles.icon}
            width={20}
            height={20}
            loading="eager"
          />

          <input
            className={styles.input}
            type="text"
            placeholder="Kyiv, Ukraine"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <div>
        <h2 className={styles.title}>Filters</h2>

        <div className={styles.group}>
          <p className={styles.groupTitle}>Camper form</p>
          {data.forms.map((item) => (
            <label key={item} className={styles.option}>
              <input
                className={styles.radioInput}
                type="radio"
                name="form"
                value={item}
                checked={form === item}
                onChange={(e) => setForm(e.target.value)}
              />
              <span className={styles.customRadio}></span>
  <span className={styles.optionText}>{item.replace("_", " ")}</span>
            </label>
          ))}
        </div>

        <div className={styles.group}>
          <p className={styles.groupTitle}>Engine</p>
          {data.engines.map((item) => (
            <label key={item} className={styles.option}>
              <input
                className={styles.radioInput}
                type="radio"
                name="engine"
                value={item}
                checked={engine === item}
                onChange={(e) => setEngine(e.target.value)}
              />
              <span className={styles.customRadio}></span>
  <span className={styles.optionText}>{item.replace("_", " ")}</span>
            </label>
          ))}
        </div>

        <div className={styles.group}>
          <p className={styles.groupTitle}>Transmission</p>
          {data.transmissions.map((item) => (
            <label key={item} className={styles.option}>
              <input
                className={styles.radioInput}
                type="radio"
                name="transmission"
                value={item}
                checked={transmission === item}
                onChange={(e) => setTransmission(e.target.value)}
              />
              <span className={styles.customRadio}></span>
  <span className={styles.optionText}>{item.replace("_", " ")}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.searchBtn} onClick={handleApplyFilters}>
          Search
        </button>

        <button className={styles.clearBtn} onClick={handleClearFilters}>
          <Image
            src="/close.svg"
            alt="clear"
            width={24}
            height={24}
            loading="eager"
          />
          Clear filters
        </button>
      </div>
    </div>
  );
}
