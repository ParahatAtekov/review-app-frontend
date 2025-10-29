import { useState } from 'react';
import api from '../libs/api';

export default function ReviewForm({ restaurantId, onSubmit }: { restaurantId: string; onSubmit: (rev: any) => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.post('/reviews', { restaurant_id: restaurantId, rating, comment });
    onSubmit(data);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label>Rating:</label>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-1">
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
}