import { MinimizedMovieItem } from "./minimized_movie_item.type";

export type MinimizedPlayer = {
  clientId: string;
  pseudo: string;
  movieItems: MinimizedMovieItem[];
};
