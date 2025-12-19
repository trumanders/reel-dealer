import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPerson, getMovieCreditsByPerson } from "../services/api.ts";
import type { Person } from "../models/Person.ts";
import { Container } from "react-bootstrap";
import PersonPageHeader from "../components/PersonPageHeader.tsx";
import PersonPageDetails from "../components/PersonPageDetails.tsx";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson.ts";

const PersonPage = () => {
  const { id } = useParams();
  const personId = id ? Number(id) : undefined;

  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [isLoadingMovieCredits, setIsLoadingMovieCredits] = useState(false);

  const [person, setPerson] = useState<Person | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCreditsByPerson | null>(
    null
  );

  useEffect(() => {
    const loadPerson = async () => {
      if (personId) {
        setIsLoadingPerson(true);
        const person = await getPerson(personId);
        setPerson(person);
        setIsLoadingPerson(false);
      }
    };

    const loadMovieCredits = async () => {
      if (personId) {
        setIsLoadingMovieCredits(true);
        const fetchedCredits = await getMovieCreditsByPerson(personId);
        setMovieCredits(fetchedCredits);
        setIsLoadingMovieCredits(false);
      }
    };

    loadPerson();
    loadMovieCredits();
  }, [personId]);

  if (isLoadingPerson || isLoadingMovieCredits) {
    return <p>LOADING...</p>;
  }

  if (!person) return null;

  return (
    <Container className="py-5 border-bottom movie-page-container">
      <PersonPageHeader person={person} movieCredits={movieCredits} />
      <PersonPageDetails person={person} movieCredits={movieCredits} />
    </Container>
  );
};

export default PersonPage;
