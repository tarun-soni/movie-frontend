export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
