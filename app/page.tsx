import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>TravelTrucks</h1>
      <p>Find your perfect camper for your next trip</p>

      <Link href="/catalog">
        <button type="button">View Now</button>
      </Link>
    </div>
  );
}