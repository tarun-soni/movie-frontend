'use client';

import { useQuery } from '@apollo/client';
import { GET_MOVIE_REVIEWS } from '@/app/graphql/queries';
import StarRating from './StarRating';

interface UsersRatingProps {
  movieId: number;
}

// _id
// movieId
// rating
// reviewText
// userId

interface Review {
  _id: string;
  movieId: string;
  rating: number;
  reviewText: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export default function UsersRating({ movieId }: UsersRatingProps) {
  console.log('movieId', movieId);
  const { loading, error, data } = useQuery(GET_MOVIE_REVIEWS, {
    variables: { movieId: movieId.toString() },
  });

  if (loading) {
    return (
      <div className="animate-pulse p-4 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading reviews: {error.message}
      </div>
    );
  }

  const reviews: Review[] = data?.getMovieReviewByMovieId || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">User Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-primary font-medium">
                    <StarRating value={review.rating} />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    by User {review.user.name}
                  </span>
                </div>
              </div>
              {review?.reviewText && (
                <p className="text-sm text-foreground">{review.reviewText}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
