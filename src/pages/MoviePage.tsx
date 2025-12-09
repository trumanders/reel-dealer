import { useEffect, useState } from "react";
import type { Movie } from "../models/Movie";
import { getMovieCredits } from "../services/api";
import type { Credits } from "../models/Credits";
import { useMovies } from "../contexts/MovieContext";

const MoviePage = () => {
  const [credits, setCredits] = useState<Credits | null>(null);
  const { movie } = useMovies();
  if (!movie) return;

  useEffect(() => {
    const fetchCredits = async () => {
      const result = await getMovieCredits(movie.id);
      setCredits(result);
    };

    fetchCredits();
  });

  return (
    <>
      <h1>{movie.title}</h1>
      <br />
      <h2>ABOUT THE MOVIE</h2>
      <p>{movie.overview}</p>
      <h2>CAST</h2>
      <ul>
        {credits?.cast.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
      <h2>CREW</h2>
      <ul>
        {credits?.crew.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </>
  );
};

export default MoviePage;
