'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOVIE_REVIEW } from '@/app/graphql/mutations';
import { GET_MOVIE_REVIEWS } from '@/app/graphql/queries';
import StarRating from './StarRating';

interface InputRatingProps {
  movieId: number;
}

export default function InputRating({ movieId }: InputRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  // { movieId, rating, reviewText, userId }
  const [addMovieReview] = useMutation(ADD_MOVIE_REVIEW, {
    variables: {
      movieId: movieId.toString(),
      rating: rating,
      reviewText: reviewText,
      // userId: userId,
    },
    refetchQueries: [
      {
        query: GET_MOVIE_REVIEWS,
        variables: { movieId: movieId.toString() },
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      <button
        type="submit"
        disabled={isSubmitting || !rating || !reviewText}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
