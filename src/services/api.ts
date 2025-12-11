import axios from "axios";
import type { MoviesSearchResponse } from "../models/MoviesSearchResponse";
import type { Credits } from "../models/Credits";
import type { Movie } from "../models/Movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_OWM_APIKEY;

export const search = async (query: string, page: number = 1) => {
  const result = await axios.get<MoviesSearchResponse>(
    BASE_URL + `/search/movie`,
    {
      params: {
        api_key: API_KEY,
        query: query,
        page: page,
      },
    }
  );
  return result.data;
};

export const getMovie = async (movieId: number) => {
  const result = await axios.get<Movie>(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  console.log("Getting movie från EIPIAI");
  return result.data;
};

export const getNowPlaying = async (page: number = 1) => {
  const result = await axios.get<MoviesSearchResponse>(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );
  return result.data;
};

export const getTrendingToday = async (page: number = 1) => {
  const result = await axios.get<MoviesSearchResponse>(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  return result.data;
};

export const getTop = async (page: number = 1) => {
  const result = await axios.get<MoviesSearchResponse>(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  return result.data;
};

export const getMovieCredits = async (movieId: number) => {
  try {
    const result = await axios.get<Credits>(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    return result.data;
  } catch (error) {
    throw new Error(
      "Error fetching movie credits: " +
        (error instanceof Error ? error?.message : "Unknown error.")
    );
  }
};
