import { useEffect, useState } from "react";
import { useMovies } from "../contexts/MovieContext.tsx";
import { useParams } from "react-router";
import { getPerson } from "../services/api.ts";
import type { Person } from "../models/Person.ts";
import { Container, Row } from "react-bootstrap";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config.ts";

const PersonPage = () => {
  const { id } = useParams();
  const personId = id ? Number(id) : undefined;

  const [person, setPerson] = useState<Person | null>(null);

  const { loadMoviesByPerson, isLoading, isLoadingMoviesByPerson } =
    useMovies();
  //   const movieId = id ? Number(id) : undefined;
  //   const { movie, loadMovie, isLoading, setIsLoading } = useMovies();

  useEffect(() => {
    const fetchPerson = async () => {
      if (personId) {
        const person = await getPerson(personId);
        setPerson(person);
      }
    };

    fetchPerson();
    loadMoviesByPerson(personId!);
  }, [personId, loadMoviesByPerson, person]);

  if (!person) return;

  return isLoading && isLoadingMoviesByPerson ? (
    <p>LOADING...</p>
  ) : (
    <Container className="py-5 border-bottom movie-page-container">
      {/* <PersonPageHeader person={person} />
      <PersonPageDetails person={person} /> */}

      <Row>
        <img src={`${MOVIE_PAGE_IMAGE_BASE_URL}${person.profile_path}`}></img>
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
