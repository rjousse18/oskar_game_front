import { Movie } from ".";

export type MinimizedMovieItem = {
  movieItemId: number;
  nominee: string;
  categoryName: string;
  movie: Movie;
};
