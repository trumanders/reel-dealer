import { Col, Row } from "react-bootstrap";
import type { Person } from "../models/Person";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson";

const PersonPageHeader = ({
  person,
  movieCredits,
}: {
  person: Person;
  movieCredits: MovieCreditsByPerson | null;
}) => {
  const getAllDepartments = Array.from(
    new Set(movieCredits?.crew?.map((c) => c.department))
  );

  const addBulletSymbol = (departments: string[], index: number) => {
    if (index < departments.length - 1) {
      return <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>;
    }
    return null;
  };

  return (
    <div className="movie-page-header">
      <Row>
        <Col>
          <h1>{person.name}</h1>
        </Col>
      </Row>

      <Row className="sub-title-text d-flex">
        <Col xs="auto">
          {movieCredits && movieCredits.cast.length > 0 && "Acting"}
          {getAllDepartments.length > 0 && (
            <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>
          )}
          {getAllDepartments.map((department, index, departments) => (
            <>
              {department}
              {addBulletSymbol(departments, index)}
            </>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default PersonPageHeader;
