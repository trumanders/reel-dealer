import Card from "react-bootstrap/Card";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";
import { useNavigate } from "react-router";
import { useMovies } from "../contexts/useMovies";
import type { SearchMovie } from "../models/SearchMovie";

interface MovieCardProps {
  searchMovie: SearchMovie;
}

const MovieCardComponent: React.FC<MovieCardProps> = ({ searchMovie }) => {
  const { loadMovie } = useMovies();
  const navigate = useNavigate();

  const handleSelectedMovie = () => {
    loadMovie(searchMovie.id);
    navigate(`/movie/${searchMovie.id}`);
  };

  return (
    <Card className="movie-card" onClick={handleSelectedMovie}>
      <Card.Img
        variant="top"
        src={
          MOVIE_PAGE_IMAGE_BASE_URL + searchMovie.poster_path ||
          "/placeholder.jpg"
        }
      />
      <Card.Body>
        <div className="rating">
          <Card.Text>⭐ {searchMovie.vote_average.toFixed(1)}</Card.Text>
        </div>
        <Card.Title>{searchMovie.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MovieCardComponent;
