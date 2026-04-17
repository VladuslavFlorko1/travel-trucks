"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Camper } from "@/types/camper";

type CamperCardProps = {
  camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  const [imageSrc, setImageSrc] = useState(camper.coverImage);

  return (
    <div>
      <Image
        src={imageSrc}
        alt={camper.name}
        width={300}
        height={200}
        onError={() => setImageSrc("/error-img/error-car-img.jpg")}
        loading="eager"
      />

      <h2>{camper.name}</h2>
      <p>{camper.description}</p>
      <p>{camper.location}</p>
      <p>€{camper.price}</p>

      <Link
        href={`/catalog/${camper.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Show more
      </Link>
    </div>
  );
}