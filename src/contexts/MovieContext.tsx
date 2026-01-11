import { createContext } from "react";
import type { MoviesSearchResponse } from "../models/SearchMovie";
import type { Movie } from "../models/Movie";
import type { Genre } from "../models/Genre";

interface MovieContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingGenres: boolean;
  setIsLoadingGenres: React.Dispatch<React.SetStateAction<boolean>>;
  movie: Movie | null;
  setMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  genres: Genre[];
  setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
  searchResponse: MoviesSearchResponse | null;
  setSearchResponse: React.Dispatch<
    React.SetStateAction<MoviesSearchResponse | null>
  >;
  handleSearch: (searchText: string, page?: number) => void;
  loadMovie: (movieId: number) => void;
  handlePageClick: (direction: number, search?: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  syncPageWithURL: (search: string) => number;
}

export const MovieContext = createContext<MovieContextType>(
  {} as MovieContextType
);
