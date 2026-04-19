"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";

type CamperCardProps = {
  camper: Camper;
};

function formatText(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

const ERROR_IMG = "/error-img/error-car-img.jpg";

export default function CamperCard({ camper }: CamperCardProps) {
  const [imgSrc, setImgSrc] = useState(camper.coverImage);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={imgSrc}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
          loading="eager"
          onError={() => setImgSrc(ERROR_IMG)}
        />
      </div>

      <div className={styles.content}>
        {/* TOP */}
        <div className={styles.topRow}>
          <h2 className={styles.title}>{camper.name}</h2>
          <p className={styles.price}>€{camper.price}</p>
        </div>

        {/* META */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Image
              src="/star/yellow.svg"
              alt="rating"
              width={16}
              height={16}
              className={styles.iconSmall}
            />
            <span>
              {camper.rating} ({camper.totalReviews} Reviews)
            </span>
          </div>

          <div className={styles.metaItem}>
            <Image
              src="/icon-card/map.svg"
              alt="location"
              width={16}
              height={16}
              className={styles.iconSmall}
            />
            <span>{camper.location}</span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className={styles.description}>{camper.description}</p>

        {/* TAGS */}
        <div className={styles.tags}>
          <span className={styles.tag}>
            <Image
              src="/icon-card/fuel.svg"
              alt="engine"
              width={20}
              height={20}
              className={styles.tagIcon}
            />
            {formatText(camper.engine)}
          </span>

          <span className={styles.tag}>
            <Image
              src="/icon-card/gear.svg"
              alt="transmission"
              width={20}
              height={20}
              className={styles.tagIcon}
            />
            {formatText(camper.transmission)}
          </span>

          <span className={styles.tag}>
            <Image
              src="/icon-card/camper.svg"
              alt="form"
              width={20}
              height={20}
              className={styles.tagIcon}
            />
            {formatText(camper.form)}
          </span>
        </div>

        {/* BUTTON */}
        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}