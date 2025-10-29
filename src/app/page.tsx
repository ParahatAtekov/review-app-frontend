'use client';

import { useState, useEffect } from 'react';
import api from '../libs/api';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, [search]);

  const fetchRestaurants = async () => {
    const { data } = await api.get('/restaurants', { params: { search } });
    setRestaurants(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map((resto: any) => (
          <RestaurantCard key={resto.id} restaurant={resto} />
        ))}
      </div>
    </div>
  );
} 