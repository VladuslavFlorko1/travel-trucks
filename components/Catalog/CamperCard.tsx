import Link from "next/link";
import { Camper } from "@/types/camper";
import Image from "next/image";

type CamperCardProps = {
  camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <div>
      <Image
        src={camper.coverImage}
        alt={camper.name}
        width={300}
        height={200}
        priority
      />
      <p>{camper.description}</p>
      <p>{camper.location}</p>
      <p>€{camper.price}</p>
      <p>{camper.transmission}</p>
      <p>{camper.engine}</p>
      <p>{camper.form}</p>

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
