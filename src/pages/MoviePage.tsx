import { useEffect } from "react";
import { useMovies } from "../contexts/MovieContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MoviePageHeader from "../components/MoviePageHeader.tsx";
import MoviePageDetails from "../components/MoviePageDetails.tsx";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams();
  const movieId = id ? Number(id) : undefined;
  const { movie, loadMovie, isLoading } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId) {
      loadMovie(movieId);
    }
  }, [movieId, loadMovie]);

  if (!movie) return;

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
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
                onClick={() => {
                  navigate(`/genres/${genre.id}`);
                }}
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
