import { useEffect, useState } from "react";
import GenreCard from "../components/GenreCard";
import { useMovies } from "../contexts/MovieContext";
import { getMoviesByGenre } from "../services/api";
import { useNavigate } from "react-router";
import type { SearchMovie } from "../models/SearchMovie";

const Genres = () => {
  const navigate = useNavigate();
  const { genres } = useMovies();
  const [moviesByGenre, setMoviesByGenre] = useState<SearchMovie[][]>([]);

  useEffect(() => {
    const loadGenresMovies = async () => {
      const response = await Promise.all(
        genres.map((genre) => getMoviesByGenre(genre.id))
      );
      const moviesArray: SearchMovie[][] = response.map((x) => x.results);
      setMoviesByGenre(moviesArray);
    };

    loadGenresMovies();
  }, [genres]);

  const handleSelectedGenre = (genreId: number) => {
    navigate(`/genres/${genreId}`);
  };

  return (
    <>
      {genres.map((genre, index) => (
        <GenreCard
          key={genre.id}
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
