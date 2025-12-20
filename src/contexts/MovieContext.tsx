import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getAllGenres, getMovie, search } from "../services/api";
import type { MoviesSearchResponse } from "../models/SearchMovie";
import type { Movie } from "../models/Movie";
import type { Genre } from "../models/Genre";
import { useNavigate } from "react-router-dom";

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
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const handleSearch = async (searchText: string, page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await search(searchText, page);
      setSearchResponse(result);
      setPage(page);
    } catch (err) {
      setError("Failed to load search results: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMovie = async (movieId: number) => {
    setIsLoading(true);
    const movieResult = await getMovie(movieId);
    setMovie(movieResult);
    setIsLoading(false);
  };

  const handlePageClick = (direction: number, search?: string) => {
    const newPage = page + direction;
    const params = new URLSearchParams(search);
    params.set("page", newPage.toString());
    navigate(`?${params.toString()}`);
  };

  const syncPageWithURL = (search: string) => {
    const params = new URLSearchParams(search);
    const newPage = Number(params.get("page") || 1);
    setPage(newPage);
    return newPage;
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
        handlePageClick,
        page,
        setPage,
        syncPageWithURL,
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
