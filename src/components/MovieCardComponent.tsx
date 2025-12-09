import Card from "react-bootstrap/Card";
import { IMAGE_BASE_URL } from "../constants/config";
import { useNavigate } from "react-router";
import { useMovies } from "../contexts/MovieContext";
import type { Movie } from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCardComponent: React.FC<MovieCardProps> = ({ movie }) => {
  const { setMovie } = useMovies();
  const navigate = useNavigate();

  const handleSelectedMovie = () => {
    setMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card style={{ width: "18rem" }} onClick={handleSelectedMovie}>
      <Card.Img
        variant="top"
        src={IMAGE_BASE_URL + movie.poster_path || "/placeholder.jpg"}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        {/* <Card.Text>{movieCard.poster_path}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default MovieCardComponent;
