import type { SearchMovie } from "./SearchMovie";

export interface DiscoverMoviesResponse {
  page: number;
  results: SearchMovie[];
  total_pages: number;
  total_results: number;
}
