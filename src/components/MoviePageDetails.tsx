import { Col, NavLink, Row } from "react-bootstrap";
import type { Movie } from "../models/Movie";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";
import React, { useEffect, useState } from "react";
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

  const uniqueWriters = Array.from(
    new Map(
      credits?.crew
        ?.filter((c) => c.department === "Writing")
        .map((w) => [w.id, w])
    ).values()
  );

  const uniqueDirectors = Array.from(
    new Map(
      credits?.crew?.filter((c) => c.job === "Director").map((d) => [d.id, d])
    ).values()
  );

  const uniqueCast = Array.from(
    new Map((credits?.cast?.slice(0, 4) ?? []).map((a) => [a.id, a])).values()
  );

  const addBulletSymbol = (index: number, arr: CrewMember[] | CastMember[]) => {
    if (index < arr.length - 1) {
      return <span>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>;
    }
    return null;
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
          {uniqueWriters && uniqueWriters.length > 0 && (
            <Row>
              <Col xs="auto">
                {uniqueWriters.length > 1 ? "Writers" : "Writer"}
              </Col>
              <Col className="d-flex">
                {uniqueWriters?.map((writer, index, writers) => (
                  <React.Fragment key={writer.id}>
                    <NavLink href={`/person/${writer.id}`}>
                      {writer.name}
                    </NavLink>
                    {addBulletSymbol(index, writers)}
                  </React.Fragment>
                ))}
              </Col>
            </Row>
          )}

          {uniqueDirectors && uniqueDirectors.length > 0 && (
            <Row>
              <Col xs="auto" className="d-flex">
                {uniqueDirectors.length > 1 ? "Directors" : "Director"}
              </Col>
              <Col className="d-flex">
                {uniqueDirectors?.map((director, index, directors) => (
                  <React.Fragment key={director.id}>
                    <NavLink href={`/person/${director.id}`}>
                      {director.name}
                    </NavLink>
                    {addBulletSymbol(index, directors)}
                  </React.Fragment>
                ))}
              </Col>
            </Row>
          )}

          {uniqueCast && uniqueCast.length > 0 && (
            <Row>
              <Col xs="auto" className="d-flex">
                {uniqueCast.length > 1 ? "Actors" : "Actor"}
              </Col>
              <Col className="d-flex">
                {uniqueCast?.map((actor, index, actors) => (
                  <React.Fragment key={actor.id}>
                    <NavLink href={`/person/${actor.id}`}>{actor.name}</NavLink>
                    {addBulletSymbol(index, actors)}
                  </React.Fragment>
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MoviePageDetails;
