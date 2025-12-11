import type { Genre } from "./Genre";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | undefined;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number;
}
