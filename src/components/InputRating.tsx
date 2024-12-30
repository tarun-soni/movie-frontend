'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE_REVIEW } from '@/app/graphql/mutations';
import { GET_MOVIE_REVIEWS } from '@/app/graphql/queries';
import StarRating from './StarRating';
import { useAuth } from '@/app/context/auth-context';
import { useRouter } from 'next/navigation';

interface InputRatingProps {
  movieId: number;
}

export default function InputRating({ movieId }: InputRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [addMovieReview] = useMutation(ADD_MOVIE_REVIEW, {
    refetchQueries: [
      {
        query: GET_MOVIE_REVIEWS,
        variables: { movieId: movieId.toString() },
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addMovieReview({
        variables: {
          movieId: movieId.toString(),
          rating: rating,
          reviewText: reviewText.trim(),
          userId: user?._id,
        },
      });

      // Reset form
      setRating(0);
      setReviewText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-muted rounded-lg text-center">
        <p className="text-muted-foreground">
          Please{' '}
          <button
            onClick={() => router.push('/auth/login')}
            className="text-primary hover:underline"
          >
            login
          </button>{' '}
          to leave a review
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-muted rounded-lg">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Your Rating</label>
        <div className="flex items-center gap-2">
          <StarRating value={rating} onChange={setRating} isInteractive />
          <span className="text-sm text-muted-foreground">
            {rating > 0 ? `${rating} stars` : 'Select rating'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="review" className="block text-sm font-medium">
          Your Review
        </label>
        <textarea
          id="review"
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your thoughts about the movie..."
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !rating || !reviewText.trim()}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
