"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useCamperById } from "@/hooks/useCamperById";
import { useCamperReviews } from "@/hooks/useCamperReviews";
import { useBookingRequest } from "@/hooks/useBookingRequest";
import RatingStars from "@/components/Shared/RatingStars";
import toast from "react-hot-toast";

export default function CamperDetails() {
  const params = useParams();
  const camperId = params.camperId as string;

  const { data, isLoading, isError, error } = useCamperById(camperId);

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useCamperReviews(camperId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const bookingMutation = useBookingRequest(camperId);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await bookingMutation.mutateAsync({ name, email });
      toast.success("Booking request sent successfully!");
      setName("");
      setEmail("");
    } catch {
      toast.error("Failed to send booking request");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{(error as Error).message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{data.name}</h1>

      <RatingStars rating={data.rating} />
      <p>{data.rating}</p>
      <p>{data.totalReviews} reviews</p>

      <div>
        {data.gallery.map(image => (
          <Image
            key={image.id}
            src={image.original}
            alt={data.name}
            width={300}
            height={200}
            priority
          />
        ))}
      </div>

      <p>{data.description}</p>
      <p>{data.location}</p>
      <p>€{data.price}</p>

      <div>
        <h2>Reviews</h2>

        {isReviewsLoading && <p>Loading reviews...</p>}

        {isReviewsError && <p>Failed to load reviews</p>}

        {Array.isArray(reviews) &&
          reviews.map(review => (
            <div key={review.id}>
              <h3>{review.reviewer_name}</h3>
              <RatingStars rating={review.reviewer_rating} />
              <p>{review.comment}</p>
            </div>
          ))}
      </div>

      <div>
        <h2>Book your camper now</h2>
        <p>Stay connected! We are always ready to help you.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />

          <button type="submit" disabled={bookingMutation.isPending}>
            {bookingMutation.isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}