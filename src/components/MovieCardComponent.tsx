import Card from "react-bootstrap/Card";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";
import { useNavigate } from "react-router";
import { useMovies } from "../contexts/MovieContext";
import type { Movie } from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCardComponent: React.FC<MovieCardProps> = ({ movie }) => {
  const { loadMovie } = useMovies();
  const navigate = useNavigate();

  const handleSelectedMovie = () => {
    loadMovie(movie.id);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card className="movie-card" onClick={handleSelectedMovie}>
      <Card.Img
        variant="top"
        src={
          MOVIE_PAGE_IMAGE_BASE_URL + movie.poster_path || "/placeholder.jpg"
        }
      />
      <Card.Body>
        <div className="rating">
          <Card.Text>Rating: {movie.vote_average}</Card.Text>
        </div>
        <Card.Title>{movie.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MovieCardComponent;
