export interface SearchMovie {
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface MoviesSearchResponse {
  page: number;
  results: SearchMovie[];
  total_pages: number;
  total_results: number;
}
