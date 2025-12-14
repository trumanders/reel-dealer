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

  const writers = credits?.crew?.filter((c) => c.department === "Writing");

  const directors = credits?.crew?.filter((c) => c.job === "Director");

  const cast = credits?.cast?.slice(0, 4);

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

          {writers && writers.length > 0 && (
            <Row>
              <Col xs="auto">{writers.length > 1 ? "Writers" : "Writer"}</Col>
              <Col className="d-flex">
                {writers?.map((writer, index, writers) => (
                  <>
                    <NavLink key={writer.id} href={`/person/${writer.id}`}>
                      {writer.name}
                    </NavLink>
                    {addBulletSymbol(index, writers)}
                  </>
                ))}
              </Col>
            </Row>
          )}

          {directors && directors.length > 0 && (
            <Row>
              <Col xs="auto" className="d-flex">
                {directors.length > 1 ? "Directors" : "Director"}
              </Col>
              <Col className="d-flex">
                {directors?.map((director, index, directors) => (
                  <>
                    <NavLink href={`/person/${director.id}`}>
                      {director.name}
                    </NavLink>
                    {addBulletSymbol(index, directors)}
                  </>
                ))}
              </Col>
            </Row>
          )}

          {cast && cast.length > 0 && (
            <Row>
              <Col xs="auto" className="d-flex">
                {cast.length > 1 ? "Actors" : "Actor"}
              </Col>
              <Col className="d-flex">
                {cast?.map((actor, index, actors) => (
                  <>
                    <NavLink href={`/person/${actor.id}`}>{actor.name}</NavLink>
                    {addBulletSymbol(index, actors)}
                  </>
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
