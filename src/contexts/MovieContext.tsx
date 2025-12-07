import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { search } from "../services/api";
import type { SearchResponse } from "../models/SearchResponse";

interface MovieContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchResponse: SearchResponse | null;
  setSearchResponse: React.Dispatch<
    React.SetStateAction<SearchResponse | null>
  >;
  handleSearch: (searchText: string, page?: number) => Promise<SearchResponse>;
}

interface TodosProviderProps {
  children: ReactNode;
}

export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: TodosProviderProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(
    null
  );

  const handleSearch = async (searchText: string, page: number = 1) => {
    // API call
    const result = await search(searchText, page);
    setSearchResponse(result);
    return result;
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
