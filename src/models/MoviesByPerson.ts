import type { Movie } from "./Movie";

export interface MoviesByPerson {
  id: number;
  cast: Movie[]; // movies the member acted in
  crew: Movie[]; // movies the member worked in production in
}
