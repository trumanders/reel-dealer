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
import type { TvCreditsByPerson } from "../models/TvCreditsByPerson";
import type { CastMovieCredits } from "../models/CastMovieCredits";
import type { CrewMovieCredits } from "../models/CrewMovieCredits";
import type { CastTvCredits } from "../models/CastTvCredits";
import type { CrewTvCredits } from "../models/CrewTvCredits";

interface MovieTvListProps {
  department: string;
  movies: CastMovieCredits[] | CrewMovieCredits[] | null;
  tv: CastTvCredits[] | CrewTvCredits[] | null;
}

const MovieTvList: React.FC<MovieTvListProps> = ({
  department,
  movies,
  tv,
}) => {
  const navigate = useNavigate();

  const handleMovieListClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <h2>{department}</h2>
      {movies && movies.length > 0 && (
        <Accordion>
          <Accordion.Item eventKey="movies">
            <Accordion.Header>
              Movies
              <Badge bg="light" text="dark" className="ms-2">
                {movies.length}
              </Badge>
            </Accordion.Header>
            <AccordionBody>
              <ListGroup variant="flush">
                {movies.map((movie) => (
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
      )}
      {tv && tv.length > 0 && (
        <Accordion>
          <Accordion.Item eventKey="tv">
            <Accordion.Header>
              Series
              <Badge bg="light" text="dark" className="ms-2">
                {tv.length}
              </Badge>
            </Accordion.Header>
            <AccordionBody>
              <ListGroup variant="flush">
                {tv.map((tv) => (
                  <ListGroup.Item
                    key={tv.id}
                    className="d-flex align-items-center"
                    onClick={() => handleMovieListClick(tv.id)}
                  >
                    <img
                      src={`${MOVIE_PAGE_IMAGE_BASE_URL}${tv.poster_path}`}
                    ></img>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </AccordionBody>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};

const PersonPageDetails = ({
  person,
  movieCredits,
  tvCredits,
}: {
  person: Person;
  movieCredits: MovieCreditsByPerson | null;
  tvCredits: TvCreditsByPerson | null;
}) => {
  const actingCreditMovies = movieCredits?.cast ?? [];
  const actingCreditTv = tvCredits?.cast ?? [];

  const moviesByCrewDepartment: Record<string, CrewMovieCredits[]> = (
    movieCredits?.crew ?? []
  ).reduce((acc: Record<string, CrewMovieCredits[]>, movie) => {
    const dept = movie.department ?? "Unknown";
    acc[dept] ??= [];
    acc[dept].push(movie);
    return acc;
  }, {});

  const tvByCrewDepartment = tvCredits?.crew.reduce(
    (acc: Record<string, CrewTvCredits[]>, movie) => {
      const dept = movie.department ?? "Unknown";
      acc[dept] ??= [];
      acc[dept].push(movie);
      return acc;
    },
    {}
  );

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
        <MovieTvList
          department="Acting"
          movies={actingCreditMovies}
          tv={actingCreditTv}
        />

        {Object.entries(moviesByCrewDepartment).map(([dept, movies]) => (
          <MovieTvList
            // key={dept}
            department={dept}
            movies={movies}
            tv={tvByCrewDepartment?.[dept] ?? []}
          />
        ))}
      </Row>
    </div>
  );
};

export default PersonPageDetails;
