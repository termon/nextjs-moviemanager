// https://github.com/maticzav/prisma2/blob/master/docs/prisma-client-js/generated-types.md

// The Movie Db Enums
export enum Genre {
  Action, Comedy, Family, Horror, Romance, SciFi, Thriller, Western, War
}
export enum Role {
  Admin, Manager, Guest
}

// Define a Movie type that includes the relation to `Reviews` 
type MovieWithReviews = MovieGetIncludePayload<{
  review: true
}>

type ReviewNoId = ReviewGetSelectPayLoad<{
  Name: true,
  On: true,
  Comment: true,
  Rating: true,
  MovieId: true
}>

type MovieNoId = MovieGetSelectPayload<{
  Title: true,
  Director: true,
  Year: true,
  Duration: true,
  Budget: true,
  Rating: true,
  PosterUrl: true,
  Genre: true,
  Cast: true,
  Plot: true,
}>


