import type { Genre } from "./Genre";

export interface Movie {
  genres: Genre[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | undefined;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
}
