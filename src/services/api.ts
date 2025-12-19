import axios from "axios";
import type { MoviesSearchResponse } from "../models/MoviesSearchResponse";
import type { Credits } from "../models/Credits";
import type { Movie } from "../models/Movie";
import type { Genre } from "../models/Genre";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson";
import type { Person } from "../models/Person";
import type { TvCreditsByPerson } from "../models/TvCreditsByPerson";
import type { DiscoverMoviesResponse } from "../models/DiscoverMovie";

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
        include_adult: false,
      },
    }
  );
  return result.data;
};

export const getMovie = async (movieId: number) => {
  const result = await axios.get<Movie>(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return result.data;
};

export const getMovieCreditsByPerson = async (personId: number) => {
  const result = await axios.get<MovieCreditsByPerson>(
    `${BASE_URL}/person/${personId}/movie_credits`,
    { params: { api_key: API_KEY, include_adult: false } }
  );
  return result.data;
};

export const getTvCreditsByPerson = async (personId: number) => {
  const result = await axios.get<TvCreditsByPerson>(
    `${BASE_URL}/person/${personId}/tv_credits`,
    { params: { api_key: API_KEY, include_adult: false } }
  );
  console.log("API RESULT: ", result.data);
  return result.data;
};

export const getPerson = async (id: number) => {
  const result = await axios.get<Person>(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}`
  );
  // return result.data;
  return new Promise<Person>((resolve) => {
    setTimeout(() => resolve(result.data), 2000); // 2s delay
  });
};

export const getNowPlaying = async (page: number = 1) => {
  const result = await axios.get<MoviesSearchResponse>(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&include_adult=false`
  );
  return result.data;
};

export const getTrendingToday = async (page: number = 1) => {
  const result = await axios.get<MoviesSearchResponse>(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}&include_adult=false`
  );
  return result.data;
};

export const getTop = async (page: number = 1) => {
  const result = await axios.get<MoviesSearchResponse>(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&include_adult=false`
  );
  return result.data;
};

export const getMovieCredits = async (movieId: number) => {
  try {
    const result = await axios.get<Credits>(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&include_adult=false`
    );

    return result.data;
  } catch (error) {
    throw new Error(
      "Error fetching movie credits: " +
        (error instanceof Error ? error?.message : "Unknown error.")
    );
  }
};

export const getAllGenres = async () => {
  const result = await axios.get<{ genres: Genre[] }>(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&include_adult=false`
  );
  return result.data.genres;
};

export const getMoviesByGenre = async (genreId: number, page = 1) => {
  const result = await axios.get<DiscoverMoviesResponse>(
    `${BASE_URL}/discover/movie`,
    {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: "popularity.desc",
        page: page,
        include_adult: false,
      },
    }
  );
  return result.data;
};
