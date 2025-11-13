// frontend/src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-primary to-purple-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.svg" alt="Campus Logo" width={40} height={40} className="drop-shadow-md" />
          <span className="text-2xl font-bold tracking-tight group-hover:text-secondary transition">
            Campus
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/discover" className="hover:text-secondary transition font-medium">
                Discover
              </Link>
              <Link href="/profile" className="hover:text-secondary transition font-medium">
                My Vibes
              </Link>
              <button onClick={logout} className="btn btn-secondary text-sm px-4 py-2">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-secondary transition font-medium">
                Log In
              </Link>
              <Link href="/signup" className="btn btn-secondary text-sm px-4 py-2">
                Join the Crew
              </Link>
            </>
          )}
 entirety
        </nav>
      </div>
    </header>
  );
}