import axios from "axios";
import type { SearchResponse } from "./SearchResponse";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_OWM_APIKEY;

export const search = async (query: string, page: number = 1) => {
  try {
    const result = await axios.get<SearchResponse>(BASE_URL + `/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        page: page,
      },
    });
    return result.data;
  } catch (error) {
    throw new Error("Error fetching search results");
  }
};
