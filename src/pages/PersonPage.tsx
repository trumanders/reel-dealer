import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getPerson,
  getMovieCreditsByPerson,
  getTvCreditsByPerson,
} from "../services/api.ts";
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
  const [isLoadingMovieCredits, setIsLoadingMovieCredits] = useState(false);
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
        setIsLoadingMovieCredits(true);
        const fetchedCredits = await getMovieCreditsByPerson(personId);
        setMovieCredits(fetchedCredits);
        setIsLoadingMovieCredits(false);
      }
    };

    const loadTvCredits = async () => {
      if (personId) {
        setIsLoadingTvCredits(true);
        const fetchedTvCredits = await getTvCreditsByPerson(personId);
        setTvCredits(fetchedTvCredits);
        setIsLoadingTvCredits(false);
      }
    };

    loadPerson();
    loadMovieCredits();
    loadTvCredits();
  }, [personId]);

  if (isLoadingPerson || isLoadingMovieCredits || isLoadingTvCredits) {
    return <p>LOADING...</p>;
  }

  if (!person) return null;

  return (
    <Container className="py-5 border-bottom movie-page-container">
      <PersonPageHeader
        person={person}
        movieCredits={movieCredits}
        tvCredits={tvCredits}
      />
      <PersonPageDetails
        person={person}
        movieCredits={movieCredits}
        tvCredits={tvCredits}
      />
    </Container>
  );
};

export default PersonPage;
