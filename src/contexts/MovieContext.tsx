import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  getAllGenres,
  getMovie,
  getMoviesByPerson,
  search,
} from "../services/api";
import type { MoviesSearchResponse } from "../models/MoviesSearchResponse";
import type { Movie } from "../models/Movie";
import type { Genre } from "../models/Genre";
import type { MoviesByPerson } from "../models/MoviesByPerson";

interface MovieContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;

  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  movie: Movie | null;
  setMovie: React.Dispatch<React.SetStateAction<Movie | null>>;

  moviesByPerson: MoviesByPerson[];
  setMoviesByPerson: React.Dispatch<React.SetStateAction<MoviesByPerson[]>>;

  genres: Genre[];
  setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;

  searchResponse: MoviesSearchResponse | null;
  setSearchResponse: React.Dispatch<
    React.SetStateAction<MoviesSearchResponse | null>
  >;
  handleSearch: (searchText: string, page?: number) => void;

  loadMovie: (movieId: number) => void;
  loadMoviesByPerson: (castMemberId: number) => void;
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
  const [moviesByPerson, setMoviesByPerson] = useState<MoviesByPerson[]>([]);

  const [genres, setGenres] = useState<Genre[]>([]);

  const handleSearch = async (searchText: string, page: number = 1) => {
    const result = await search(searchText, page);
    setSearchResponse(result);
  };

  const loadMovie = async (movieId: number) => {
    const movieResult = await getMovie(movieId);
    console.log("loadMovie", movieResult);
    setMovie(movieResult);
  };

  const loadMoviesByPerson = async (castMemberId: number) => {
    const result = await getMoviesByPerson(castMemberId);
    setMoviesByPerson(result);
  };

  useEffect(() => {
    const loadGenres = async () => {
      const fetchedGenres = await getAllGenres();
      setGenres(fetchedGenres);
    };
    loadGenres();
  }, []);

  console.log("Fetched genressssss:", genres);

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
        moviesByPerson,
        setMoviesByPerson,
        loadMoviesByPerson,
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
