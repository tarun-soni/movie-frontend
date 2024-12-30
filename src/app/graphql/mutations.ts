import { gql } from '@apollo/client';

// { movieId, rating, reviewText, userId }
export const ADD_MOVIE_REVIEW = gql`
  mutation createMovieReview(
    $movieId: String!
    $rating: Int!
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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      name
      email
      token
    }
  }
`;
