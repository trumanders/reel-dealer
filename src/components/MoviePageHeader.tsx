import { Col, Row } from "react-bootstrap";
import type { Movie } from "../models/Movie";

const MoviePageHeader = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-page-header">
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
            <div>🔥 {movie.popularity.toFixed(0)}</div>
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
    </div>
  );
};

export default MoviePageHeader;
