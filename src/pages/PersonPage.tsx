import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieCreditsByPerson, getPerson } from "../services/api.ts";
import type { Person } from "../models/Person.ts";
import { Container, Row } from "react-bootstrap";
import PersonPageHeader from "../components/PersonPageHeader.tsx";
import PersonPageDetails from "../components/PersonPageDetails.tsx";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson.ts";

const PersonPage = () => {
  const { id } = useParams();
  const personId = id ? Number(id) : undefined;

  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);

  const [person, setPerson] = useState<Person | null>(null);
  const [movieCreditsByPerson, setMovieCreditsByPerson] =
    useState<MovieCreditsByPerson | null>(null);

  useEffect(() => {
    const loadPerson = async () => {
      if (personId) {
        setIsLoadingPerson(true);
        const person = await getPerson(personId);
        setPerson(person);
        setIsLoadingPerson(false);
      }
    };

    const loadMovieCreditsByPerson = async () => {
      if (personId) {
        setIsLoadingCredits(true);
        const movieCredits = await getMovieCreditsByPerson(personId);
        setMovieCreditsByPerson(movieCredits);
        setIsLoadingCredits(false);
      }
    };

    loadPerson();
    loadMovieCreditsByPerson();
  }, [personId]);

  if (isLoadingPerson || isLoadingCredits) {
    return <p>LOADING...</p>;
  }

  if (!person) return null;
  return (
    <Container className="py-5 border-bottom movie-page-container">
      <PersonPageHeader person={person} movieCredits={movieCreditsByPerson} />
      <PersonPageDetails person={person} movieCredits={movieCreditsByPerson} />
    </Container>
  );
};

export default PersonPage;
