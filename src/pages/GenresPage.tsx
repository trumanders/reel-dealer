import { useEffect, useState } from "react";
import GenreCard from "../components/GenreCard";
import { useMovies } from "../contexts/MovieContext";
import { getMoviesByGenre } from "../services/api";
import {
  type DiscoverMovie,
  type DiscoverMoviesResponse,
} from "../models/DiscoverMovie";
import { useNavigate } from "react-router";

const Genres = () => {
  const navigate = useNavigate();
  const { genres } = useMovies();
  const [moviesByGenre, setMoviesByGenre] = useState<
    DiscoverMovie[][] | null
  >();
  const [discoverMovieResponse, setDiscoverMovieResponse] = useState<
    DiscoverMoviesResponse[] | null
  >();

  useEffect(() => {
    console.log("USE EFFECT RUNNING");
    const loadGenresMovies = async () => {
      const response = await Promise.all(
        genres.map((genre) => getMoviesByGenre(genre.id))
      );
      const moviesArray: DiscoverMovie[][] = response.map((x) => x.results);
      setMoviesByGenre(moviesArray);
      setDiscoverMovieResponse(response);
    };

    loadGenresMovies();
  }, []);

  const handleSelectedGenre = (id: number) => {
    navigate(`/genres/${id}`);
  };

  return (
    <>
      {genres.map((genre, index) => (
        <GenreCard
          genreId={genre.id}
          genreName={genre.name}
          moviePosters={
            moviesByGenre?.[index]?.slice(0, 4).map((m) => m.poster_path) ?? []
          }
          onSelectGenre={() => handleSelectedGenre(genre.id)}
        />
      ))}
    </>
  );
};

export default Genres;
