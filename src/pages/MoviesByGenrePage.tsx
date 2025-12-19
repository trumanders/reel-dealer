import { useEffect, useState } from "react";
import type { Movie } from "../models/Movie";
import { getMoviesByGenre } from "../services/api";
import { useParams, useLocation } from "react-router";

const MoviesByGenre = () => {
  const [moviesInGenre, setMoviesInGenre] = useState<Movie[]>();
  const [page, setPage] = useState<number | null>(null);
  const { id } = useParams();
  const genreId = id ? Number(id) : undefined;

  const location = useLocation();

  useEffect(() => {
    const fetchedMoviesInGenre = async () => {
      if (genreId) {
        const response = await getMoviesByGenre(genreId, page);
        setMoviesInGenre(response.results.)
      }
    };
    const params = new URLSearchParams(location.search);
    const page = Number(params.get("page") || 1);
  });

  return (
    <>
      <p>MOVIES IN GENRE:</p>
    </>
  );
};

export default MoviesByGenre;
