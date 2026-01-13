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

const MovieList: React.FC<MovieListProps> = ({ department, movies }) => {
  const navigate = useNavigate();

  const handleMovieListClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <h2>{department}</h2>
      {movies && movies.length > 0 && (
        <Accordion className="accordion mb-4">
          <Accordion.Item eventKey="movies">
            <Accordion.Header>{` ${movies.length} Movies`}</Accordion.Header>
            <AccordionBody>
              <ListGroup variant="flush">
                {movies.map((movie) => (
                  <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    key={movie.id}
                    className="d-flex align-items-start"
                    onClick={() => handleMovieListClick(movie.id)}
                  >
                    <div className="d-flex my-0 p-2 rounded w-100 movie-list-item">
                      <img
                        className="my-0"
                        src={`${MOVIE_PAGE_IMAGE_BASE_URL}${movie.poster_path}`}
                      ></img>
                      <div className="d-flex flex-column ms-3">
                        <h5>{movie.title}</h5>
                        <div>⭐ {movie.vote_average.toFixed(1)}</div>
                      </div>
                    </div>
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
