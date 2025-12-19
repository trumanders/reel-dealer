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
import type { DiscoverMoviesResponse } from "../models/DiscoverMovieResponse";

const MoviesByGenrePage = () => {
  const { genres } = useMovies();
  const [discoverMoviesResponse, setDiscoverMoviesResponse] =
    useState<DiscoverMoviesResponse | null>(null);
  const [moviesInGenre, setMoviesInGenre] = useState<SearchMovie[]>();
  const [page, setPage] = useState<number>(1);
  const { id } = useParams();
  const genreId = id ? Number(id) : undefined;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get("page") || 1);
    setPage(page);

    const fetchMoviesInGenre = async () => {
      if (genreId) {
        const response = await getMoviesByGenre(genreId, page);
        setDiscoverMoviesResponse(response);
        setMoviesInGenre(response.results);
      }
    };

    fetchMoviesInGenre();
  }, [genreId, location.search]);

  const handlePageClick = (direction: number) => {
    const newPage = page + direction;
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    setPage(newPage);
    navigate(`?${params.toString()}`);
  };

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
      <PaginationComponent
        page={page}
        totalPages={discoverMoviesResponse?.total_pages || 0}
        onPageClick={handlePageClick}
      />
    </Container>
  );
};

export default MoviesByGenrePage;
