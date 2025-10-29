'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <nav className = "bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className = "container mx-auto flex justify-between items-center">
                <Link href="/">Home</Link>
                <div>
                    { user ? (
                        <>
                            <Link href="/profile" className="mr-4">Profile</Link>
                            <button onClick={logout}>Logout</button>
                        </>
                        ) : (
                        <>
                            <Link href="/login" className="mr-4">Login</Link>
                            <Link href="/signup">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}