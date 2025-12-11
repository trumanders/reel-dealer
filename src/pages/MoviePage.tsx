import { useEffect, useState } from "react";
import { getMovieCredits } from "../services/api";
import type { Credits } from "../models/Credits";
import { useMovies } from "../contexts/MovieContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config.ts";

const MoviePage = () => {
  const { id } = useParams();
  const movieId = id ? Number(id) : undefined;
  const [credits, setCredits] = useState<Credits | null>(null);
  const { movie, loadMovie, genres } = useMovies();

  useEffect(() => {
    if (!movie && movieId) {
      loadMovie(movieId);
      console.log("USEEFFECT load Movie");
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
      <Row>
        <Col>
          <h1>{movie.title}</h1>
        </Col>
        <Col xs="auto" className="d-flex gap-5">
          <div>
            <div>RATING</div>
            <div>⭐ {movie.vote_average.toFixed(1)}</div>
            <div>{movie.vote_count} votes</div>
          </div>
          <div>
            <div>POPULARITY</div>
            <div>🔥 {movie.popularity}</div>
          </div>
        </Col>
      </Row>

      <Row className="sub-title-text">
        <Col>Original title: {movie.original_title}</Col>
      </Row>

      <Row className="sub-title-text">
        <Col xs="auto">
          {movie.release_date.slice(0, 4)} • {movie.runtime} min
        </Col>
      </Row>

      <Row className="d-flex">
        <Col xs="auto">
          <img src={`${MOVIE_PAGE_IMAGE_BASE_URL}${movie.poster_path}`}></img>
        </Col>
        <Col>
          <h5>hej</h5>
        </Col>
      </Row>
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
