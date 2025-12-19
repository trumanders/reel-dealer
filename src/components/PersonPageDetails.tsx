import { Accordion, AccordionBody, Col, ListGroup, Row } from "react-bootstrap";
import type { Person } from "../models/Person";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";
import { useNavigate } from "react-router";
import type { CastMovieCredits } from "../models/CastMovieCredits";
import type { CrewMovieCredits } from "../models/CrewMovieCredits";

interface MovieListProps {
  department: string;
  movies: CastMovieCredits[] | CrewMovieCredits[] | null;
}

const MovieList: React.FC<MovieListProps> = ({
  department,
  movies,
  // tv,
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
            <Accordion.Header>{` ${movies.length} Movies`}</Accordion.Header>
            <AccordionBody>
              <ListGroup variant="stream">
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
    </div>
  );
};

const PersonPageDetails = ({
  person,
  movieCredits,
}: {
  person: Person;
  movieCredits: MovieCreditsByPerson | null;
}) => {
  const actingCreditMovies = movieCredits?.cast ?? [];

  const moviesByCrewDepartment: Record<string, CrewMovieCredits[]> = (
    movieCredits?.crew ?? []
  ).reduce((acc: Record<string, CrewMovieCredits[]>, movie) => {
    const dept = movie.department ?? "Unknown";
    acc[dept] ??= [];
    acc[dept].push(movie);
    return acc;
  }, {});

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
        <MovieList
          department="Acting"
          movies={actingCreditMovies}
          // tv={actingCreditTv}
        />

        {Object.entries(moviesByCrewDepartment).map(([dept, movies]) => (
          <MovieList key={dept} department={dept} movies={movies} />
        ))}
      </Row>
    </div>
  );
};

export default PersonPageDetails;
