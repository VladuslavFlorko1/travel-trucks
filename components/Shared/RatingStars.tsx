"use client";

import Image from "next/image";
import styles from "./RatingStars.module.css";

type Props = {
  rating: number; // наприклад 4.2
};

export default function RatingStars({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <div className={styles.stars}>
      {[...Array(totalStars)].map((_, index) => {
        const isFilled = index < fullStars;

        return (
          <Image
            key={index}
            src={isFilled ? "/star/yellow.svg" : "/star/white.svg"}
            alt="star"
            width={16}
            height={16}
          />
        );
      })}
    </div>
  );
}