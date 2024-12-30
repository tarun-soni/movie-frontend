import { gql } from '@apollo/client';

// { movieId, rating, reviewText, userId }
export const ADD_MOVIE_REVIEW = gql`
  mutation createMovieReview(
    $movieId: String!
    $rating: Float!
    $reviewText: String!
    $userId: String!
  ) {
    createMovieReview(
      movieId: $movieId
      rating: $rating
      reviewText: $reviewText
      userId: $userId
    ) {
      _id
      movieId
      rating
      reviewText
      user {
        _id
        name
        email
      }
    }
  }
`;
