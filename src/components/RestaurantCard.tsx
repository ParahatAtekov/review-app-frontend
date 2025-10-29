import Link from 'next/link';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  average_rating: number;
}

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl">{restaurant.name}</h2>
      <p>{restaurant.address}, {restaurant.city}</p>
      <p>Rating: {restaurant.average_rating} ⭐</p>
      <Link href={`/restaurants/${restaurant.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
}