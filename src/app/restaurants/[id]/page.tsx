'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/libs/api'; // Or '@/lib/api' if renamed
import ReviewForm from '@/components/ReviewForm';
import { useAuth } from '@/hooks/useAuth';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: resto } = await api.get(`/restaurants/${id}`);
      setRestaurant(resto);
      const { data: revs } = await api.get(`/reviews/${id}`);
      setReviews(revs);
    } catch (err) {
      setError(
        'Unauthorized access—check Supabase anon key in .env or RLS policies.'
      );
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addReview = (newReview: any) => {
    setReviews([newReview, ...reviews]);
    fetchData();
  };

  if (loading) return <div className="p-6 text-center">Loading details...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
      <p className="text-gray-600 mb-4">
        Rating: {restaurant.average_rating} ⭐
      </p>
      {user && <ReviewForm restaurantId={id} onSubmit={addReview} />}
      <h2 className="text-xl font-semibold mt-6 mb-2">Reviews</h2>
      {reviews.map((rev: any) => (
        <div key={rev.id} className="border p-3 mb-3 rounded shadow-sm">
          <p className="font-medium">
            {rev.rating} ⭐ by {rev.profiles.username}
          </p>
          <p className="text-gray-700">{rev.comment}</p>
        </div>
      ))}
    </div>
  );
}
