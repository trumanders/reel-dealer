import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type { MovieCard } from "../models/MovieCard";
import { IMAGE_BASE_URL } from "../constants/config";

interface MovieCardProps {
  movieCard: MovieCard;
}

const MovieCardComponent: React.FC<MovieCardProps> = ({ movieCard }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={IMAGE_BASE_URL + movieCard.poster_path || "/placeholder.jpg"}
      />
      <Card.Body>
        <Card.Title>{movieCard.title}</Card.Title>
        {/* <Card.Text>{movieCard.poster_path}</Card.Text> */}
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCardComponent;
