export interface DiscoverMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  original_title: string;
  original_language: string;
}

export interface DiscoverMoviesResponse {
  page: number;
  results: DiscoverMovie[];
  total_pages: number;
  total_results: number;
}
