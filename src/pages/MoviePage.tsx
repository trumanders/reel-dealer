import { useEffect, useState } from "react";
import { getMovieCredits } from "../services/api";
import type { Credits } from "../models/Credits";
import { useMovies } from "../contexts/MovieContext";
import { Button, Col, Container, NavLink, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config.ts";
import MoviePageHeader from "../components/MoviePageHeader.tsx";
import MoviePageDetails from "../components/MoviePageDetails.tsx";

const MoviePage = () => {
  const { id } = useParams();
  const movieId = id ? Number(id) : undefined;
  const [credits, setCredits] = useState<Credits | null>(null);
  const { movie, loadMovie, isLoading, setIsLoading } = useMovies();

  useEffect(() => {
    if (!movie && movieId) {
      setIsLoading(true);
      loadMovie(movieId);
      setIsLoading(false);
    }
  }, [movieId, loadMovie, movie]);

  useEffect(() => {
    const fetchCredits = async () => {
      if (movie) {
        const result = await getMovieCredits(movie.id);
        setCredits(result);
      }
    };

    fetchCredits();
  }, [movie]);

  if (!movie) return;

  return (
    <Container className="py-5 border-bottom movie-page-container">
      <MoviePageHeader movie={movie} />
      <MoviePageDetails movie={movie} />

      <Row>
        <Col>
          {movie?.genres?.length &&
            movie.genres.map((genre) => (
              <Button
                key={genre.id}
                className="genre-button"
                variant="outline-light"
              >
                {genre.name}
              </Button>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
