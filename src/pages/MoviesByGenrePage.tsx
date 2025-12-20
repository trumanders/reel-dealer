import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../services/api";
import { useParams, useLocation } from "react-router";
import type { SearchMovie } from "../models/SearchMovie";
import { Container } from "react-bootstrap";
import MovieList from "../components/MovieList";
import { useMovies } from "../contexts/MovieContext";
import MovieCardComponent from "../components/MovieCardComponent";
import PaginationComponent from "../components/PaginationComponent";
import type { DiscoverMoviesResponse } from "../models/DiscoverMovieResponse";

const MoviesByGenrePage = () => {
  const { genres, handlePageClick, page, syncPageWithURL, error, setError } =
    useMovies();
  const [discoverMoviesResponse, setDiscoverMoviesResponse] =
    useState<DiscoverMoviesResponse | null>(null);
  const [moviesInGenre, setMoviesInGenre] = useState<SearchMovie[]>();
  const { id } = useParams();
  const genreId = id ? Number(id) : undefined;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(null);

    const currentPage = syncPageWithURL(location.search);

    setIsLoading(true);
    const fetchMoviesInGenre = async () => {
      try {
        if (genreId) {
          const response = await getMoviesByGenre(genreId, currentPage);
          setDiscoverMoviesResponse(response);
          setMoviesInGenre(response.results);
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load movies for genre: " + (err as Error).message);
      }
    };

    fetchMoviesInGenre();
  }, [genreId, location.search]);

  if (error) {
    return <p>{error}</p>;
  }

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    moviesInGenre && (
      <Container className="movie-list-container">
        <MovieList
          className="movie-list"
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
          onPageClick={(direction) => handlePageClick(direction)}
        />
      </Container>
    )
  );
};

export default MoviesByGenrePage;
