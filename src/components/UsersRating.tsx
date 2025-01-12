'use client';

import { useMutation, useQuery } from '@apollo/client';
import { GET_MOVIE_REVIEWS } from '@/app/graphql/queries';
import StarRating from './StarRating';
import Button from './button';
import { useAuth } from '@/app/context/auth-context';
import { DELETE_MOVIE_REVIEW } from '@/app/graphql/mutations';
interface UsersRatingProps {
  movieId: number;
}

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
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_MOVIE_REVIEWS, {
    variables: { movieId: movieId.toString() },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview, { loading: deleteLoading }] = useMutation(
    DELETE_MOVIE_REVIEW,
    {
      refetchQueries: [GET_MOVIE_REVIEWS],
    }
  );

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const response = await deleteReview({ variables: { reviewId } });

      if (response.data.deleteMovieReview.message) {
        alert('Review deleted successfully');
      } else {
        alert('Failed to delete review');
      }
    } catch (error) {
      console.log('error', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to delete review');
      }
    }
  };

  const reviews: Review[] = data?.getMovieReviewByMovieId || [];

  if (loading && !data) {
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
              <div className="flex flex-row justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-primary font-medium">
                      <StarRating value={review.rating} />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      by {review.user.name}
                    </span>
                  </div>
                </div>

                {review.user._id === user._id && (
                  <Button
                    onClick={() => {
                      handleDeleteReview(review._id);
                    }}
                    disabled={deleteLoading}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    {deleteLoading ? 'Deleting...' : 'Delete'}
                  </Button>
                )}
              </div>
              {review?.reviewText && (
                <div
                  className="prose prose-sm max-w-none text-foreground [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3 [&>blockquote]:border-l-4 [&>blockquote]:border-primary/50 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-2 [&>p]:mb-2 [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: review.reviewText }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
