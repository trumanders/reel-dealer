import { useEffect, useState } from "react";
import GenreCard from "../components/GenreCard";
import { useMovies } from "../contexts/MovieContext";
import { getMoviesByGenre } from "../services/api";
import { useNavigate } from "react-router";
import type { SearchMovie } from "../models/SearchMovie";
import { Container, Row } from "react-bootstrap";

const Genres = () => {
  const navigate = useNavigate();
  const { genres, error, setError, isLoading, setIsLoading } = useMovies();
  const [moviesByGenre, setMoviesByGenre] = useState<SearchMovie[][]>([]);

  useEffect(() => {
    setError(null);
    const loadGenresMovies = async () => {
      try {
        setIsLoading(true);
        const response = await Promise.all(
          genres.map((genre) => getMoviesByGenre(genre.id))
        );
        const moviesArray: SearchMovie[][] = response.map((x) => x.results);
        setMoviesByGenre(moviesArray);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load movies for genres: " + (err as Error).message);
      }
    };

    if (genres.length > 0) {
      loadGenresMovies();
    }
  }, [genres, setError]);

  const handleSelectedGenre = (genreId: number) => {
    navigate(`/genres/${genreId}`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {genres.map((genre, index) => (
          <GenreCard
            key={genre.id}
            genreId={genre.id}
            genreName={genre.name}
            moviePosters={
              moviesByGenre?.[index]?.slice(0, 4).map((m) => m.poster_path) ??
              []
            }
            onSelectGenre={() => handleSelectedGenre(genre.id)}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Genres;
