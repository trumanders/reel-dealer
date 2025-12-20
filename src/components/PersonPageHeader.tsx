import { Col, Row } from "react-bootstrap";
import type { Person } from "../models/Person";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson";
import React from "react";

const PersonPageHeader = ({
  person,
  movieCredits,
}: {
  person: Person;
  movieCredits: MovieCreditsByPerson | null;
}) => {
  const getCrewDepartments = Array.from(
    new Set(movieCredits?.crew?.map((c) => c.department) ?? [])
  );

  const addBulletSymbol = (departments: string[], index: number) => {
    if (index < departments.length - 1) {
      return <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>;
    }
    return null;
  };

  const isActor = movieCredits && movieCredits.cast.length > 0;
  return (
    <div className="movie-page-header">
      <Row>
        <Col>
          <h1>{person.name}</h1>
        </Col>
      </Row>

      <Row className="sub-title-text d-flex">
        <Col xs="auto">
          {isActor && "Acting"}
          {getCrewDepartments.length > 0 && (
            <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>
          )}
          {getCrewDepartments.map((department, index, departments) => (
            <React.Fragment key={department}>
              {department}
              {addBulletSymbol(departments, index)}
            </React.Fragment>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default PersonPageHeader;
