'use client';

import { useState, useEffect } from 'react';
import api from '../libs/api';
import { useRouter } from 'next/navigation';

// Define a proper User type (shared or local)
interface User {
  id: string;
  username?: string;
  // Add other fields as needed
}

export const useAuth = () => {
  // Explicitly type the state: null (logged out) or User object
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally validate token or fetch user profile
      // For now, we'll set a placeholder user
      setUser({ id: 'temp' }); // Replace with real user data later
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser({ id: 'authenticated' }); // Replace with real user fetch if needed
    router.push('/');
  };

  const signup = async (email: string, password: string, username: string) => {
    await api.post('/auth/signup', { email, password, username });
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null); // Correct: set to null
    router.push('/login');
  };

  return { user, login, signup, logout };
};