import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DeleteReviewResponse = {
  __typename?: 'DeleteReviewResponse';
  message: Scalars['String']['output'];
};

export type Movie = {
  __typename?: 'Movie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdrop_path?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  original_language?: Maybe<Scalars['String']['output']>;
  original_title?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Int']['output']>;
  poster_path?: Maybe<Scalars['String']['output']>;
  release_date?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  vote_average?: Maybe<Scalars['Float']['output']>;
  vote_count?: Maybe<Scalars['Int']['output']>;
};

/** movie review schema type */
export type MovieReview = {
  __typename?: 'MovieReview';
  _id?: Maybe<Scalars['ID']['output']>;
  movieId: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  reviewText?: Maybe<Scalars['String']['output']>;
  user: UserWithoutToken;
};

export type MovieType = {
  __typename?: 'MovieType';
  results?: Maybe<Array<Movie>>;
  total_pages?: Maybe<Scalars['Int']['output']>;
  total_results?: Maybe<Scalars['Int']['output']>;
};

/** ---all mutations here--- */
export type Mutation = {
  __typename?: 'Mutation';
  /** create movie review */
  createMovieReview: MovieReview;
  /** register or create user */
  createUser: User;
  /** delete movie review */
  deleteMovieReview: DeleteReviewResponse;
  /** returns string bascically the jwt token */
  login: User;
};


/** ---all mutations here--- */
export type MutationCreateMovieReviewArgs = {
  movieId: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  reviewText?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};


/** ---all mutations here--- */
export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** ---all mutations here--- */
export type MutationDeleteMovieReviewArgs = {
  reviewId: Scalars['String']['input'];
};


/** ---all mutations here--- */
export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** ---all querys here--- */
export type Query = {
  __typename?: 'Query';
  /** user queries */
  getAllMovieReviews: Array<Maybe<MovieReview>>;
  /** user queries */
  getCurrentUser: User;
  getGraphqlPopularMovies: MovieType;
  getMovieReviewByMovieId: Array<MovieReview>;
};


/** ---all querys here--- */
export type QueryGetGraphqlPopularMoviesArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
};


/** ---all querys here--- */
export type QueryGetMovieReviewByMovieIdArgs = {
  movieId: Scalars['String']['input'];
};

/** user schema type */
export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type UserWithoutToken = {
  __typename?: 'UserWithoutToken';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateMovieReviewMutationVariables = Exact<{
  movieId: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  reviewText: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type CreateMovieReviewMutation = { __typename?: 'Mutation', createMovieReview: { __typename?: 'MovieReview', _id?: string | null, movieId: string, rating: number, reviewText?: string | null, user: { __typename?: 'UserWithoutToken', _id: string, name: string, email: string } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', _id: string, name: string, email: string, token?: string | null } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, name: string, email: string, token?: string | null } };

export type DeleteMovieReviewMutationVariables = Exact<{
  reviewId: Scalars['String']['input'];
}>;


export type DeleteMovieReviewMutation = { __typename?: 'Mutation', deleteMovieReview: { __typename?: 'DeleteReviewResponse', message: string } };

export type GetMovieReviewsQueryVariables = Exact<{
  movieId: Scalars['String']['input'];
}>;


export type GetMovieReviewsQuery = { __typename?: 'Query', getMovieReviewByMovieId: Array<{ __typename?: 'MovieReview', _id?: string | null, movieId: string, rating: number, reviewText?: string | null, user: { __typename?: 'UserWithoutToken', _id: string, name: string, email: string } }> };

export type GetGraphqlPopularMoviesQueryVariables = Exact<{
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetGraphqlPopularMoviesQuery = { __typename?: 'Query', getGraphqlPopularMovies: { __typename?: 'MovieType', total_pages?: number | null, total_results?: number | null, results?: Array<{ __typename?: 'Movie', id?: number | null, title?: string | null, adult?: boolean | null, overview?: string | null, poster_path?: string | null, release_date?: string | null, vote_average?: number | null }> | null } };


export const CreateMovieReviewDocument = gql`
    mutation createMovieReview($movieId: String!, $rating: Int!, $reviewText: String!, $userId: String!) {
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
export type CreateMovieReviewMutationFn = Apollo.MutationFunction<CreateMovieReviewMutation, CreateMovieReviewMutationVariables>;

/**
 * __useCreateMovieReviewMutation__
 *
 * To run a mutation, you first call `useCreateMovieReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovieReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMovieReviewMutation, { data, loading, error }] = useCreateMovieReviewMutation({
 *   variables: {
 *      movieId: // value for 'movieId'
 *      rating: // value for 'rating'
 *      reviewText: // value for 'reviewText'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateMovieReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateMovieReviewMutation, CreateMovieReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMovieReviewMutation, CreateMovieReviewMutationVariables>(CreateMovieReviewDocument, options);
      }
export type CreateMovieReviewMutationHookResult = ReturnType<typeof useCreateMovieReviewMutation>;
export type CreateMovieReviewMutationResult = Apollo.MutationResult<CreateMovieReviewMutation>;
export type CreateMovieReviewMutationOptions = Apollo.BaseMutationOptions<CreateMovieReviewMutation, CreateMovieReviewMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    _id
    name
    email
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password) {
    _id
    name
    email
    token
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteMovieReviewDocument = gql`
    mutation DeleteMovieReview($reviewId: String!) {
  deleteMovieReview(reviewId: $reviewId) {
    message
  }
}
    `;
export type DeleteMovieReviewMutationFn = Apollo.MutationFunction<DeleteMovieReviewMutation, DeleteMovieReviewMutationVariables>;

/**
 * __useDeleteMovieReviewMutation__
 *
 * To run a mutation, you first call `useDeleteMovieReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovieReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMovieReviewMutation, { data, loading, error }] = useDeleteMovieReviewMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useDeleteMovieReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMovieReviewMutation, DeleteMovieReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMovieReviewMutation, DeleteMovieReviewMutationVariables>(DeleteMovieReviewDocument, options);
      }
export type DeleteMovieReviewMutationHookResult = ReturnType<typeof useDeleteMovieReviewMutation>;
export type DeleteMovieReviewMutationResult = Apollo.MutationResult<DeleteMovieReviewMutation>;
export type DeleteMovieReviewMutationOptions = Apollo.BaseMutationOptions<DeleteMovieReviewMutation, DeleteMovieReviewMutationVariables>;
export const GetMovieReviewsDocument = gql`
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

/**
 * __useGetMovieReviewsQuery__
 *
 * To run a query within a React component, call `useGetMovieReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMovieReviewsQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useGetMovieReviewsQuery(baseOptions: Apollo.QueryHookOptions<GetMovieReviewsQuery, GetMovieReviewsQueryVariables> & ({ variables: GetMovieReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMovieReviewsQuery, GetMovieReviewsQueryVariables>(GetMovieReviewsDocument, options);
      }
export function useGetMovieReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMovieReviewsQuery, GetMovieReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMovieReviewsQuery, GetMovieReviewsQueryVariables>(GetMovieReviewsDocument, options);
        }
export function useGetMovieReviewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMovieReviewsQuery, GetMovieReviewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMovieReviewsQuery, GetMovieReviewsQueryVariables>(GetMovieReviewsDocument, options);
        }
export type GetMovieReviewsQueryHookResult = ReturnType<typeof useGetMovieReviewsQuery>;
export type GetMovieReviewsLazyQueryHookResult = ReturnType<typeof useGetMovieReviewsLazyQuery>;
export type GetMovieReviewsSuspenseQueryHookResult = ReturnType<typeof useGetMovieReviewsSuspenseQuery>;
export type GetMovieReviewsQueryResult = Apollo.QueryResult<GetMovieReviewsQuery, GetMovieReviewsQueryVariables>;
export const GetGraphqlPopularMoviesDocument = gql`
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

/**
 * __useGetGraphqlPopularMoviesQuery__
 *
 * To run a query within a React component, call `useGetGraphqlPopularMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGraphqlPopularMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGraphqlPopularMoviesQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *   },
 * });
 */
export function useGetGraphqlPopularMoviesQuery(baseOptions?: Apollo.QueryHookOptions<GetGraphqlPopularMoviesQuery, GetGraphqlPopularMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGraphqlPopularMoviesQuery, GetGraphqlPopularMoviesQueryVariables>(GetGraphqlPopularMoviesDocument, options);
      }
export function useGetGraphqlPopularMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGraphqlPopularMoviesQuery, GetGraphqlPopularMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGraphqlPopularMoviesQuery, GetGraphqlPopularMoviesQueryVariables>(GetGraphqlPopularMoviesDocument, options);
        }
export function useGetGraphqlPopularMoviesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGraphqlPopularMoviesQuery, GetGraphqlPopularMoviesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGraphqlPopularMoviesQuery, GetGraphqlPopularMoviesQueryVariables>(GetGraphqlPopularMoviesDocument, options);
        }
export type GetGraphqlPopularMoviesQueryHookResult = ReturnType<typeof useGetGraphqlPopularMoviesQuery>;
export type GetGraphqlPopularMoviesLazyQueryHookResult = ReturnType<typeof useGetGraphqlPopularMoviesLazyQuery>;
export type GetGraphqlPopularMoviesSuspenseQueryHookResult = ReturnType<typeof useGetGraphqlPopularMoviesSuspenseQuery>;
export type GetGraphqlPopularMoviesQueryResult = Apollo.QueryResult<GetGraphqlPopularMoviesQuery, GetGraphqlPopularMoviesQueryVariables>;