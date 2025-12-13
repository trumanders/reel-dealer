import { useEffect, useState } from "react";
import { getNowPlaying, getTop, getTrendingToday } from "../services/api";
import type { MoviesSearchResponse } from "../models/MoviesSearchResponse";
import { Container } from "react-bootstrap";
import MovieCardComponent from "../components/MovieCardComponent";
import { useMovies } from "../contexts/MovieContext";

interface CategoryProps {
  moviesInCategory: MoviesSearchResponse | null;
  title: string;
}

const Category: React.FC<CategoryProps> = ({ moviesInCategory, title }) => (
  <>
    <h2>{title}</h2>
    <div className="category">
      {moviesInCategory && moviesInCategory.results.length > 0 ? (
        moviesInCategory.results.map((movie) => (
          <div key={movie.id}>
            <MovieCardComponent movie={movie} />
          </div>
        ))
      ) : (
        <div>No movies found.</div>
      )}
    </div>
  </>
);

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
      <Category moviesInCategory={nowPlaying} title="Now Playing" />
      <Category moviesInCategory={trending} title="Trending" />
      <Category moviesInCategory={topRated} title="Top Rated" />
    </Container>
  );
};

export default HomePage;
