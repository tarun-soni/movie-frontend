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

export const GET_POPULAR_MOVIES = gql`
  query GetGraphqlPopularMovies($pageNumber: Int) {
    getGraphqlPopularMovies(pageNumber: $pageNumber) {
      total_pages
      total_results
      results {
        id
        title
        adult
        overview
        poster_path
        release_date
        vote_average
      }
    }
  }
`;
