import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getAllGenres, getMovie, search } from "../services/api";
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
}

interface TodosProviderProps {
  children: ReactNode;
}

export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: TodosProviderProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGenres, setIsLoadingGenres] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] =
    useState<MoviesSearchResponse | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const handleSearch = async (searchText: string, page: number = 1) => {
    setIsLoading(true);
    const result = await search(searchText, page);
    setSearchResponse(result);
    setIsLoading(false);
  };

  const loadMovie = async (movieId: number) => {
    setIsLoading(true);
    const movieResult = await getMovie(movieId);
    setMovie(movieResult);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadGenres = async () => {
      setIsLoadingGenres(true);
      const fetchedGenres = await getAllGenres();
      setGenres(fetchedGenres);
      setIsLoadingGenres(false);
    };
    loadGenres();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        searchText,
        error,
        setError,
        isLoading,
        setIsLoading,
        isLoadingGenres,
        setIsLoadingGenres,
        searchResponse,
        setSearchResponse,
        setSearchText,
        handleSearch,
        movie,
        setMovie,
        loadMovie,
        genres,
        setGenres,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
