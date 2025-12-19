import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../services/api";
import { useParams, useLocation } from "react-router";
import type { SearchMovie } from "../models/SearchMovie";
import { Container, Pagination } from "react-bootstrap";
import MovieList from "../components/MovieList";
import { useMovies } from "../contexts/MovieContext";
import MovieCardComponent from "../components/MovieCardComponent";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";

const MoviesByGenrePage = () => {
  const { genres } = useMovies();
  const [moviesInGenre, setMoviesInGenre] = useState<SearchMovie[]>();
  const [page, setPage] = useState<number | null>(0);
  const { id } = useParams();
  const genreId = id ? Number(id) : undefined;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get("page") || 1);

    const fetchMoviesInGenre = async () => {
      if (genreId) {
        const response = await getMoviesByGenre(genreId, page);
        console.log("Fetched page: ", page);
        setMoviesInGenre(response.results);
      }
    };

    fetchMoviesInGenre();
  }, [genreId, location.search]);

  console.log("Movies in genre:", moviesInGenre);

  return (
    <Container className="movie-list-container">
      <MovieList
        className="movies-by-genre"
        movies={moviesInGenre ?? null}
        title={genres.find((g) => g.id === genreId)?.name || "Movies"}
        renderMovie={(movie) => (
          <div key={movie.id}>
            <MovieCardComponent searchMovie={movie} />
          </div>
        )}
      />
      <PaginationComponent />
    </Container>
  );
};

export default MoviesByGenrePage;
