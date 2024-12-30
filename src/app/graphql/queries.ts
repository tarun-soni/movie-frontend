import { gql } from '@apollo/client';

export const GET_MOVIE_REVIEWS = gql`
  query GetMovieReviews($movieId: String!) {
    getMovieReviewByMovieId(movieId: $movieId) {
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
