import { useEffect, useState } from "react";
import { useMovies } from "../contexts/MovieContext.tsx";
import { useParams } from "react-router";
import { getMovieCreditsByPerson, getPerson } from "../services/api.ts";
import type { Person } from "../models/Person.ts";
import { Container, Row } from "react-bootstrap";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config.ts";
import PersonPageHeader from "../components/PersonPageHeader.tsx";
import PersonPageDetails from "../components/PersonPageDetails.tsx";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson.ts";

const PersonPage = () => {
  const { id } = useParams();
  const personId = id ? Number(id) : undefined;

  const [person, setPerson] = useState<Person | null>(null);
  const [movieCreditsByPerson, setMovieCreditsByPerson] =
    useState<MovieCreditsByPerson | null>(null);

  const {
    // loadCombinedCreditsByPerson,
    isLoading,
    isLoadingCombinedCreditsByPerson,
  } = useMovies();
  //   const movieId = id ? Number(id) : undefined;
  //   const { movie, loadMovie, isLoading, setIsLoading } = useMovies();

  useEffect(() => {
    const loadPerson = async () => {
      if (personId) {
        const person = await getPerson(personId);
        setPerson(person);
      }
    };

    const loadMovieCreditsByPerson = async () => {
      if (personId) {
        const movieCredits = await getMovieCreditsByPerson(personId);
        setMovieCreditsByPerson(movieCredits);
      }
    };

    loadPerson();
    loadMovieCreditsByPerson();
  }, [personId]);

  if (!person) return;

  return isLoading && isLoadingCombinedCreditsByPerson ? (
    <p>LOADING...</p>
  ) : (
    <Container className="py-5 border-bottom movie-page-container">
      <PersonPageHeader person={person} movieCredits={movieCreditsByPerson} />
      <PersonPageDetails />

      <Row xs="auto">
        <img src={`${MOVIE_PAGE_IMAGE_BASE_URL}${person.profile_path}`}></img>
      </Row>
    </Container>
  );
};

export default PersonPage;
