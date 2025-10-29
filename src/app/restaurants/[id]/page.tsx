'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../lib/api';
import ReviewForm from '../../../components/ReviewForm';
import { useAuth } from '../../../hooks/useAuth';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: resto } = await api.get(`/restaurants/${id}`);
    setRestaurant(resto);
    const { data: revs } = await api.get(`/reviews/${id}`);
    setReviews(revs);
  };

  const addReview = (newReview: any) => {
    setReviews([newReview, ...reviews]);
    // Refetch restaurant for updated rating
    fetchData();
  };

  return (
    <div>
      {restaurant && (
        <>
          <h1 className="text-2xl">{restaurant.name}</h1>
          <p>Rating: {restaurant.average_rating} ⭐</p>
          {user && <ReviewForm restaurantId={id} onSubmit={addReview} />}
          <h2 className="text-xl mt-4">Reviews</h2>
          {reviews.map((rev: any) => (
            <div key={rev.id} className="border p-2 mt-2">
              <p>{rev.rating} ⭐ by {rev.profiles.username}</p>
              <p>{rev.comment}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}