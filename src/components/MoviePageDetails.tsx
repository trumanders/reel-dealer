import { Col, NavLink, Row } from "react-bootstrap";
import type { Movie } from "../models/Movie";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";
import { useEffect, useState } from "react";
import type { CastMember, Credits, CrewMember } from "../models/Credits";
import { getMovieCredits } from "../services/api";

const MoviePageDetails = ({ movie }: { movie: Movie }) => {
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      if (movie) {
        const result = await getMovieCredits(movie.id);
        setCredits(result);
      }
    };

    fetchCredits();
  }, [movie]);

  const hasMultipleWriters = () => {
    if (!credits) return false;
    return (
      credits?.crew.filter((crewMember) => crewMember.job === "Writer").length >
      1
    );
  };

  const hasMultipleDirectors = () => {
    if (!credits) return false;
    return (
      credits?.crew.filter((crewMember) => crewMember.job === "Director")
        .length > 1
    );
  };

  const hasMultipleActors = () => {
    if (!credits) return false;
    return credits?.cast.length > 1;
  };

  const addBulletSymbol = (index: number, arr: CrewMember[] | CastMember[]) => {
    return index < arr.length - 1 && <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>;
  };

  useEffect(() => {
    const fetchCredits = async () => {
      if (movie) {
        const result = await getMovieCredits(movie.id);
        setCredits(result);
      }
    };

    fetchCredits();
  }, [movie]);

  return (
    <div className="movie-page-details">
      <Row className="d-flex">
        <Col xs="auto">
          <img src={`${MOVIE_PAGE_IMAGE_BASE_URL}${movie.poster_path}`}></img>
        </Col>
        <Col>
          <p>{movie.overview}</p>

          <Row>
            <Col xs="auto">{hasMultipleWriters() ? "Writers" : "Writer"}</Col>
            <Col className="d-flex">
              {credits?.crew
                .filter((crewMember) => crewMember.department === "Writing")
                .map((writer, index, writers) => (
                  <>
                    <NavLink key={writer.id} href="">
                      {writer.name}
                    </NavLink>
                    {addBulletSymbol(index, writers)}
                  </>
                ))}
            </Col>
          </Row>

          <Row>
            <Col xs="auto" className="d-flex">
              {hasMultipleDirectors() ? "Directors" : "Director"}
              {hasMultipleDirectors() ? "Directors" : "Director"}
            </Col>
            <Col className="d-flex">
              {credits?.crew
                .filter((crewMember) => crewMember.job === "Director")
                .map((director, index, directors) => (
                  <>
                    <NavLink href="">{director.name}</NavLink>
                    {addBulletSymbol(index, directors)}
                  </>
                ))}
            <Col className="d-flex">
              {credits?.crew
                .filter((crewMember) => crewMember.job === "Director")
                .map((director, index, directors) => (
                  <>
                    <NavLink href="">{director.name}</NavLink>
                    {addBulletSymbol(index, directors)}
                  </>
                ))}
            </Col>
          </Row>
          <Row>
            <Col xs="auto" className="d-flex">
              {hasMultipleActors() ? "Actors" : "Actor"}
              {hasMultipleActors() ? "Actors" : "Actor"}
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
