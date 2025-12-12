import { Col, Row } from "react-bootstrap";
import type { Person } from "../models/Person";

const PersonPageHeader = ({ person }: { person: Person }) => {
  const getRollByDepartment = (knownForDepartment: string, gender: number) => {
    if (knownForDepartment === "Acting") {
      return gender === 1 ? "Actor" : "Actress";
    }
  };

  return (
    <div className="movie-page-header">
      <Row>
        <Col>
          <h1>{person.name}</h1>
        </Col>
        <Col xs="auto" className="d-flex gap-5">
          {/* <div>
            <div>RATING</div>
            <div>⭐ {movie.vote_average.toFixed(1)}</div>
            <div>{movie.vote_count} votes</div>
          </div>
          <div>
            <div>POPULARITY</div>
            <div>🔥 {movie.popularity}</div>
          </div> */}
        </Col>
      </Row>

      <Row className="sub-title-text">
        <Col>
          {getRollByDepartment(person.known_for_department, person.gender)}
        </Col>
      </Row>

      <Row className="sub-title-text">
        <Col xs="auto">
          {/* {movie.release_date.slice(0, 4)} • {movie.runtime} min */}
        </Col>
      </Row>
    </div>
  );
};

export default PersonPageHeader;
