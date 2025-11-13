// frontend/src/components/RestaurantCard.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  average_rating: number;
  description?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
}

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-72 cursor-pointer [perspective:1000px] motion-reduce:[perspective:none]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onTouchStart={() => setFlipped(true)}
    >
      <div className="[transform-style:preserve-3d] relative h-full w-full transition-transform duration-700">
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden card p-5 flex flex-col">
          <div className="flex items-start gap-3 mb-2">
            <div className="shrink-0">
              {restaurant.logo_url ? (
                <Image
                  src={restaurant.logo_url}
                  alt={`${restaurant.name} logo`}
                  width={56}
                  height={56}
                  className="rounded-lg object-contain bg-neutral border border-primary/10 shadow-sm"
                  unoptimized
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary text-xl font-bold shadow-sm border border-primary/10">
                  {restaurant.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-heading font-bold text-black line-clamp-1">
                {restaurant.name}
              </h3>
              <span className="text-secondary text-lg font-bold">
                {restaurant.average_rating} ✨
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-700 font-body mb-1 line-clamp-1">
            {restaurant.address}, {restaurant.city}
          </p>

          {restaurant.phone && (
            <p className="text-sm text-gray-600 font-body flex items-center mb-1">
              <PhoneIcon className="h-4 w-4 text-accent mr-1.5 shrink-0" />
              <span className="truncate">{restaurant.phone}</span>
            </p>
          )}

          {restaurant.website && (
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:text-accent/80 font-body flex items-center mb-2 underline-offset-2 hover:underline transition-colors truncate"
            >
              <GlobeAltIcon className="h-4 w-4 mr-1.5 shrink-0" />
              <span className="truncate">Website</span>
            </a>
          )}

          {restaurant.description && (
            <p className="text-xs text-gray-600 font-body line-clamp-2 mt-auto">
              {restaurant.description}
            </p>
          )}

          <div className="mt-3">
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              Check the Vibe <span className="text-xs">→</span>
            </Link>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-gradient-to-br from-neutral to-primary/5 rounded-xl shadow-md p-5 flex flex-col justify-center items-center text-center border border-primary/20">
          <h4 className="text-xl font-heading font-bold text-primary mb-3">
            {restaurant.name}
          </h4>
          <p className="text-sm text-black font-body px-4">
            Flip again to see the vibe!
          </p>
        </div>
      </div>
    </div>
  );
}