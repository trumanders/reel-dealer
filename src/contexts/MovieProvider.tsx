import { useNavigate } from "react-router";
import { getAllGenres, getMovie, search } from "../services/api";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { MoviesSearchResponse } from "../models/SearchMovie";
import type { Movie } from "../models/Movie";
import type { Genre } from "../models/Genre";
import { MovieContext } from "./MovieContext";

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
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

  const handleSearch = useCallback(
    async (searchText: string, page: number = 1) => {
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
    },
    []
  );

  const loadMovie = useCallback(async (movieId: number) => {
    setIsLoading(true);
    const movieResult = await getMovie(movieId);
    setMovie(movieResult);
    setIsLoading(false);
  }, []);

  const handlePageClick = (direction: number, search?: string) => {
    const newPage = page + direction;
    const params = new URLSearchParams(search);
    params.set("page", newPage.toString());
    navigate(`?${params.toString()}`);
  };

  const syncPageWithURL = useCallback((search: string) => {
    const params = new URLSearchParams(search);
    const newPage = Number(params.get("page") || 1);
    setPage(newPage);
    return newPage;
  }, []);

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
