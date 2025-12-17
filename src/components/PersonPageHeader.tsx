import { Col, Row } from "react-bootstrap";
import type { Person } from "../models/Person";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson";
import type { TvCreditsByPerson } from "../models/TvCreditsByPerson";
import React from "react";

const PersonPageHeader = ({
  person,
  movieCredits,
  tvCredits,
}: {
  person: Person;
  movieCredits: MovieCreditsByPerson | null;
  tvCredits: TvCreditsByPerson | null;
}) => {
  const getAllCrewDepartments = Array.from(
    new Set([
      ...(tvCredits?.crew?.map((c) => c.department) ?? []),
      ...(movieCredits?.crew?.map((c) => c.department) ?? []),
    ])
  );

  const getTvCrewDepartments = Array.from(
    new Set(tvCredits?.crew?.map((c) => c.department) ?? [])
  );

  const getMovieCrewDepartments = Array.from(
    new Set(movieCredits?.crew?.map((c) => c.department) ?? [])
  );

  console.log("TV DEPARTMENTS: ", getTvCrewDepartments);
  console.log("MOVIE DEPARTMENTS: ", getMovieCrewDepartments);

  console.log("MOVIE CREDITS: ", movieCredits);
  console.log("TV CREDITS: ", tvCredits);

  const addBulletSymbol = (departments: string[], index: number) => {
    if (index < departments.length - 1) {
      return <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>;
    }
    return null;
  };

  const isActor =
    (movieCredits && movieCredits.cast.length > 0) ||
    (tvCredits && tvCredits.cast.length > 0);

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
          {getAllCrewDepartments.length > 0 && (
            <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>
          )}
          {getAllCrewDepartments.map((department, index, departments) => (
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
