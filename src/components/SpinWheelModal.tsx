// frontend/src/components/SpinWheelModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/libs/api';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  average_rating: number;
}

export default function SpinWheelModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && restaurants.length === 0) {
      api.get('/restaurants').then((res) => setRestaurants(res.data));
    }
  }, [isOpen]);

  const spin = () => {
    if (restaurants.length === 0) return;
    setSpinning(true);
    setSelected(null);
    setTimeout(() => {
      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
      setSelected(random);
      setSpinning(false);
    }, 2000);
  };

  const goToRestaurant = () => {
    onClose();
    router.push(`/restaurants/${selected?.id}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-primary/20">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-primary p-1 rounded-full transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-heading font-bold text-primary text-center mb-6">
          Let Fate Pick Your Hangout!
        </h2>

        {selected ? (
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-secondary to-amber-400 text-black rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-black">{selected.name}</h3>
            <p className="text-gray-600 font-body text-sm">{selected.address}, {selected.city}</p>
            <p className="text-secondary text-xl font-bold">{selected.average_rating} ✨</p>
            <button
              onClick={goToRestaurant}
              className="w-full btn btn-primary py-4 text-lg font-bold shadow-lg flex items-center justify-center gap-2"
            >
              Let's Go! <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div
                className={`w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center text-5xl font-bold text-accent shadow-lg transition-all duration-1000 ease-out ${
                  spinning ? 'animate-custom-spin' : 'hover:rotate-12 hover:scale-105'
                }`}
              >
                {spinning ? '?' : '🎲'}
              </div>
            </div>
            <p className="text-center text-gray-600 font-body text-sm">
              Where will the night take you?
            </p>
          </div>
        )}

        {!selected && (
          <button
            onClick={spin}
            disabled={spinning}
            className="w-full mt-6 btn btn-secondary py-4 text-lg font-bold shadow-lg disabled:opacity-50"
          >
            {spinning ? 'Spinning...' : 'SPIN THE WHEEL!'}
          </button>
        )}
      </div>
    </div>
  );
}