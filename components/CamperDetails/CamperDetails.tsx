"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { CamperDetails as CamperDetailsType } from "@/types/camper";
import { useCamperReviews } from "@/hooks/useCamperReviews";
import { useBookingRequest } from "@/hooks/useBookingRequest";
import RatingStars from "@/components/Shared/RatingStars";
import styles from "./CamperCard.module.css";

type Props = {
  camper: CamperDetailsType;
};

export default function CamperDetails({ camper }: Props) {
  const [activeImage, setActiveImage] = useState(
    camper.gallery?.[0]?.original || "/placeholder.jpg"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: reviews, isLoading, isError } = useCamperReviews(camper.id);
  const bookingMutation = useBookingRequest(camper.id);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await bookingMutation.mutateAsync({ name, email });
      toast.success("Booking request sent successfully!");
      setName("");
      setEmail("");
    } catch {
      toast.error("Failed to send booking request");
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>

        {/* ===== Верхній блок ===== */}
        <div className={styles.top}>

          {/* Галерея */}
          <div className={styles.galleryColumn}>
            <div className={styles.mainImageWrap}>
              <Image
                src={activeImage}
                alt={camper.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.mainImage}
                priority
                loading="eager"
                onError={() => setActiveImage("/placeholder.jpg")}
              />
            </div>

            <div className={styles.thumbs}>
              {camper.gallery.map((image) => {
                const isActive = activeImage === image.original;
                return (
                  <button
                    key={image.id}
                    type="button"
                    className={`${styles.thumbButton} ${
                      isActive ? styles.thumbButtonActive : ""
                    }`}
                    onClick={() => setActiveImage(image.original)}
                  >
                    <div className={styles.thumbWrap}>
                      <Image
                        src={image.thumb}
                        alt={camper.name}
                        fill
                        sizes="120px"
                        className={styles.thumbImage}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Інфо-картка */}
          <div className={styles.infoCard}>
            <h1 className={styles.title}>{camper.name}</h1>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <Image
                  src="/star/yellow.svg"
                  alt="rating"
                  width={16}
                  height={16}
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
                />
                <span>{camper.location}</span>
              </div>
            </div>

            <p className={styles.price}>€{camper.price}</p>
            <p className={styles.description}>{camper.description}</p>

            {/* ===== Vehicle details ===== */}
            <div className={styles.detailsCard}>
              <h2 className={styles.detailsTitle}>Vehicle details</h2>

              <div className={styles.tags}>
                <span className={styles.tag}>{camper.transmission}</span>
                <span className={styles.tag}>AC</span>
                <span className={styles.tag}>{camper.engine}</span>
                <span className={styles.tag}>Kitchen</span>
                <span className={styles.tag}>Radio</span>
                <span className={styles.tag}>
                  {camper.form.replace(/_/g, " ")}
                </span>
              </div>

              <div className={styles.specs}>
                <div className={styles.specRow}>
                  <span>Form</span>
                  <span>{camper.form.replace(/_/g, " ")}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </div>
              </div>
            </div>
            {/* ===== /Vehicle details ===== */}

          </div>
        </div>

        {/* ===== Нижній блок ===== */}
        <div className={styles.bottom}>

          {/* Відгуки */}
          <div className={styles.reviewsBlock}>
            <h2 className={styles.sectionTitle}>Reviews</h2>

            {isLoading && <p>Loading reviews...</p>}
            {isError && <p>Failed to load reviews</p>}

            {Array.isArray(reviews) && (
              <div className={styles.reviewsList}>
                {reviews.map((review) => (
                  <article key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.reviewInfo}>
                        <p className={styles.reviewerName}>
                          {review.reviewerName}
                        </p>
                        <RatingStars rating={review.reviewerRating} />
                      </div>
                    </div>
                    <p className={styles.reviewText}>{review.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Форма */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Book your campervan now</h2>
            <p className={styles.formSubtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}