import { Col, NavLink, Row } from "react-bootstrap";
import type { Movie } from "../models/Movie";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";

const MoviePageDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-page-details">
      <Row className="d-flex">
        <Col xs="auto">
          <img src={`${MOVIE_PAGE_IMAGE_BASE_URL}${movie.poster_path}`}></img>
        </Col>
        <Col>
          <p>{movie.overview}</p>

          <Row>
            <Col xs="auto">WRITERS</Col>
            <Col>
              <NavLink href="">Anders</NavLink>
            </Col>
          </Row>

          <Row>
            <Col xs="auto" className="d-flex">
              DIRECTORS
            </Col>
            <Col>
              <NavLink href="">Anders</NavLink>
            </Col>
          </Row>
          <Row>
            <Col xs="auto" className="d-flex">
              ACTORS
            </Col>
            <Col>
              <NavLink href="">Anders</NavLink>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MoviePageDetails;
