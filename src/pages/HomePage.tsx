import { useEffect, useState } from "react";
import {
  getNowPlaying,
  getTop,
  getTrendingToday,
  getTrendingWeek,
} from "../services/api";
import type { MoviesSearchResponse } from "../models/SearchMovie";
import { Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import MovieCardComponent from "../components/MovieCardComponent";
import { useMovies } from "../contexts/MovieContext";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const { error, setError } = useMovies();
  const [trending, setTrending] = useState<MoviesSearchResponse | null>(null);
  const [nowPlaying, setNowPlaying] = useState<MoviesSearchResponse | null>(
    null
  );
  const [topRated, setTopRated] = useState<MoviesSearchResponse | null>(null);
  const [trendingState, setTrendingState] = useState<"day" | "week">("day");

  const { isLoading } = useMovies();

  useEffect(() => {
    setError(null);
    const fetchCategories = async () => {
      try {
        const nowPlaying = await getNowPlaying();
        const top = await getTop();
        const trending =
          trendingState === "day"
            ? await getTrendingToday()
            : await getTrendingWeek();

        setNowPlaying(nowPlaying);
        setTrending(trending);
        setTopRated(top);
      } catch (err) {
        setError("Failed to fetch movie categories: " + (err as Error).message);
      }
    };

    fetchCategories();
  }, [trendingState]);

  const isDataReady = () => {
    return (
      (nowPlaying?.results?.length ?? 0) > 0 &&
      (trending?.results?.length ?? 0) > 0 &&
      (topRated?.results?.length ?? 0) > 0
    );
  };

  if (error) {
    return <p>{error}</p>;
  }

  return !isDataReady() || isLoading ? (
    <p>LOADING...</p>
  ) : (
    <Container className="movie-list-container">
      <MovieList
        className="category"
        movies={nowPlaying?.results ?? null}
        title="Now Playing"
        renderMovie={(movie) => (
          <div key={movie.id}>
            <MovieCardComponent searchMovie={movie} />
          </div>
        )}
      />

      {/* Trending + switch */}
      <div className="d-flex align-items-center">
        <h2 className="m-0">Trending</h2>
        <ButtonGroup size="sm">
          <ToggleButton
            className="ms-5"
            id="trending-today"
            type="radio"
            variant="outline-light"
            checked={trendingState === "day"}
            onChange={() => setTrendingState("day")}
            value="day"
          >
            Today
          </ToggleButton>
          <ToggleButton
            id="trending-week"
            type="radio"
            variant="outline-light"
            checked={trendingState === "week"}
            onChange={() => setTrendingState("week")}
            value="week"
          >
            This Week
          </ToggleButton>
        </ButtonGroup>
      </div>

      <MovieList
        className="category pt-0"
        movies={trending?.results ?? null}
        title={null}
        renderMovie={(movie) => (
          <div key={movie.id}>
            <MovieCardComponent searchMovie={movie} />
          </div>
        )}
      />
      <MovieList
        className="category"
        movies={topRated?.results ?? null}
        title="Top Rated"
        renderMovie={(movie) => (
          <div key={movie.id}>
            <MovieCardComponent searchMovie={movie} />
          </div>
        )}
      />
    </Container>
  );
};

export default HomePage;
