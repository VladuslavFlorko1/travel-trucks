type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({ rating }: RatingStarsProps) {
  const roundedRating = Math.round(rating);

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index}>
          {index < roundedRating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}