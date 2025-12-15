import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieCredits, getPerson } from "../services/api.ts";
import type { Person } from "../models/Person.ts";
import { Container } from "react-bootstrap";
import PersonPageHeader from "../components/PersonPageHeader.tsx";
import PersonPageDetails from "../components/PersonPageDetails.tsx";
import type { MovieCreditsByPerson } from "../models/MovieCreditsByPerson.ts";
import type { TvCreditsByPerson } from "../models/TvCreditsByPerson.tsx";

const PersonPage = () => {
  const { id } = useParams();
  const personId = id ? Number(id) : undefined;

  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [isLoadingTvCredits, setIsLoadingTvCredits] = useState(false);

  const [person, setPerson] = useState<Person | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCreditsByPerson | null>(
    null
  );
  const [tvCredits, setTvCredits] = useState<TvCreditsByPerson | null>(null);

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
        setIsLoadingCredits(true);
        const movieCredits = await getMovieCredits(personId);
        setMovieCredits(movieCredits);
        setIsLoadingCredits(false);
      }
    };

    const loadTvCredits = async () => {
      if (personId) {
        setIsLoadingTvCredits(true);
        const tvCredits = await getTvCreditsByPerson(personId);
        setTvCredits(tvCredits);
        setIsLoadingTvCredits(false);
      }
    };

    loadPerson();
    loadMovieCredits();
    loadTvCredits;
  }, [personId]);

  if (isLoadingPerson || isLoadingCredits || isLoadingTvCredits) {
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
