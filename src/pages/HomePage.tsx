import { useEffect, useState } from "react";
import { getNowPlaying, getTop, getTrendingToday } from "../services/api";
import type { MoviesSearchResponse } from "../models/SearchMovie";
import { Container, ThemeProvider } from "react-bootstrap";
import MovieCardComponent from "../components/MovieCardComponent";
import { useMovies } from "../contexts/MovieContext";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const [trending, setTrending] = useState<MoviesSearchResponse | null>(null);
  const [nowPlaying, setNowPlaying] = useState<MoviesSearchResponse | null>(
    null
  );
  const [topRated, setTopRated] = useState<MoviesSearchResponse | null>(null);

  const { isLoading } = useMovies();

  useEffect(() => {
    const fetchCategories = async () => {
      const nowPlaying = await getNowPlaying();
      const trendingToday = await getTrendingToday();
      const top = await getTop();

      setNowPlaying(nowPlaying);
      setTrending(trendingToday);
      setTopRated(top);
    };

    fetchCategories();
  }, []);

  const isDataReady = () => {
    return (
      (nowPlaying?.results?.length ?? 0) > 0 &&
      (trending?.results?.length ?? 0) > 0 &&
      (topRated?.results?.length ?? 0) > 0
    );
  };

  return !isDataReady() ? (
    <p>LOADING...</p>
  ) : (
    <Container className="categories-container">
      <MovieList
        movies={nowPlaying?.results ?? null}
        title="Now Playing"
        renderMovie={(movie) => (
          <div key={movie.id}>
            <MovieCardComponent searchMovie={movie} />
          </div>
        )}
      />
      <MovieList
        movies={trending?.results ?? null}
        title="Trending"
        renderMovie={(movie) => (
          <div key={movie.id}>
            <MovieCardComponent searchMovie={movie} />
          </div>
        )}
      />
      <MovieList
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
