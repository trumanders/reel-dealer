import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { search } from "../services/api";
import type { MoviesSearchResponse } from "../models/MoviesSearchResponse";
import type { Movie } from "../models/Movie";

interface MovieContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchResponse: MoviesSearchResponse | null;
  setSearchResponse: React.Dispatch<
    React.SetStateAction<MoviesSearchResponse | null>
  >;
  handleSearch: (searchText: string, page?: number) => void;
  movie: Movie | null;
  setMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
}

interface TodosProviderProps {
  children: ReactNode;
}

export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: TodosProviderProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] =
    useState<MoviesSearchResponse | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleSearch = async (searchText: string, page: number = 1) => {
    const result = await search(searchText, page);
    setSearchResponse(result);
  };

  return (
    <MovieContext.Provider
      value={{
        searchText,
        error,
        setError,
        isLoading,
        setIsLoading,
        searchResponse,
        setSearchResponse,
        setSearchText,
        handleSearch,
        movie,
        setMovie,
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
