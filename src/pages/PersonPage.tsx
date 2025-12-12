import { useEffect, useState } from "react";
import { useMovies } from "../contexts/MovieContext.tsx";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import MoviePageHeader from "../components/MoviePageHeader.tsx";
import MoviePageDetails from "../components/MoviePageDetails.tsx";
import type { Movie } from "../models/Movie.ts";
import { getPerson } from "../services/api.ts";
import type { Person } from "../models/Person.ts";

const PersonPage = () => {
  const { id } = useParams();
  const personId = id ? Number(id) : undefined;

  const [person, setPerson] = useState<Person | null>(null);

  const { loadMoviesByPerson, moviesByPerson, isLoading, setIsLoading } =
    useMovies();
  //   const movieId = id ? Number(id) : undefined;
  //   const { movie, loadMovie, isLoading, setIsLoading } = useMovies();

  useEffect(() => {
    const fetchPerson = async () => {
      if (!personId) return;
      const person = await getPerson(personId);
      setPerson(person);
    };

    if (personId) {
      fetchPerson();
      setIsLoading(true);
      loadMoviesByPerson(personId);
      setIsLoading(false);
    }
  }, [personId, loadMoviesByPerson, person]);

  if (!person) return;

  return (
    <Container className="py-5 border-bottom movie-page-container">
      {/* <PersonPageHeader person={person} />
      <PersonPageDetails person={person} /> */}

      <Row>
        {/* <Col>
          {movie?.genres?.length &&
            movie.genres.map((genre) => (
              <Button
                key={genre.id}
                className="genre-button"
                variant="outline-light"
              >
                {genre.name}
              </Button>
            ))}
        </Col> */}
      </Row>
    </Container>
  );
};

export default PersonPage;
