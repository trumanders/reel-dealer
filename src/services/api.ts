import axios from "axios";
import type { MoviesSearchResponse } from "../models/MoviesSearchResponse";
import type { Credits } from "../models/Credits";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_OWM_APIKEY;

export const search = async (query: string, page: number = 1) => {
  try {
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
    console.log(result.data);
    return result.data;
  } catch (error) {
    throw new Error(
      "Error fetching search results: " +
        (error instanceof Error ? error?.message : "Unknown error.")
    );
  }
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
