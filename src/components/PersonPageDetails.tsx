import {
  Accordion,
  AccordionBody,
  Badge,
  Col,
  ListGroup,
  Row,
} from "react-bootstrap";
import type { Person } from "../models/Person";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";
import { useNavigate } from "react-router";

interface MovieTvListProps {
  movieCredits: MovieCreditsByPerson | null;
}

const MovieTvList: React.FC<MovieTvListProps> = ({ movieCredits }) => {
  const navigate = useNavigate();

  const handleMovieListClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    movieCredits &&
    movieCredits.cast.length > 0 && (
      <div>
        <h2>Actor</h2>
        <Accordion>
          <Accordion.Item eventKey="movies">
            <Accordion.Header>
              Movies
              <Badge bg="light" text="dark" className="ms-2">
                {movieCredits.cast.length}
              </Badge>
            </Accordion.Header>
            <AccordionBody>
              <ListGroup variant="flush">
                {movieCredits.cast.map((movie) => (
                  <ListGroup.Item
                    key={movie.id}
                    className="d-flex align-items-center"
                    onClick={() => handleMovieListClick(movie.id)}
                  >
                    <img
                      src={`${MOVIE_PAGE_IMAGE_BASE_URL}${movie.poster_path}`}
                    ></img>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </AccordionBody>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  );
};

const PersonPageDetails = ({
  person,
  movieCredits,
}: {
  person: Person;
  movieCredits: MovieCreditsByPerson | null;
}) => {
  return (
    <div className="movie-page-details">
      <Row className="d-flex">
        <Col xs="auto">
          <img src={`${MOVIE_PAGE_IMAGE_BASE_URL}${person.profile_path}`}></img>
        </Col>
        <Col>
          <p>{person.biography}</p>
        </Col>
      </Row>
      <Row>
        <MovieTvList movieCredits={movieCredits}></MovieTvList>
      </Row>
    </div>
  );
};

export default PersonPageDetails;
