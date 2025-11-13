// frontend/src/app/page.tsx
'use client';                     // ← Makes this a Client Component

import { useState, useEffect } from 'react';   // ← IMPORT useEffect
import RestaurantCard from '@/components/RestaurantCard';
import SpinWheelModal from '@/components/SpinWheelModal';
import api from '@/libs/api';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  // Load restaurants on mount
  useEffect(() => {
    api.get('/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error('Failed to load restaurants:', err));
  }, []);

  return (
    <>
      {/* ==== HERO ==== */}
      <section className="text-center py-16 px-4 bg-gradient-to-b from-primary/10 to-white">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
          Gather the Crew. Find the Vibe.
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
          Campus connects you to local dining spots where great food meets great company. 
          Share reviews, spark conversations, and turn every meal into a memory.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-secondary text-xl px-8 py-4 shadow-xl"
        >
          Spin for Tonight’s Hangout!
        </button>
      </section>

      {/* ==== RESTAURANT LIST ==== */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          What’s the Vibe Today?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* ==== SPIN WHEEL MODAL ==== */}
      <SpinWheelModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}