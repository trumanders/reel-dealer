import { Card, Col, Row } from "react-bootstrap";
import { MOVIE_PAGE_IMAGE_BASE_URL } from "../constants/config";

interface GenreCardProps {
  genreId: number;
  genreName: string;
  moviePosters: string[];
  onSelectGenre: (genreId: number) => void;
}

const GenreCard: React.FC<GenreCardProps> = ({
  genreId,
  genreName,
  moviePosters,
  onSelectGenre,
}) => {
  return (
    <Card
      as="button"
      type="button"
      className="genre-card"
      onClick={() => onSelectGenre(genreId)}
    >
      <Card.Header>{genreName}</Card.Header>
      <Card.Body>
        <Row className="g-1">
          {moviePosters.map((poster, index) => (
            <Col xs={3} key={index}>
              <img
                src={`${MOVIE_PAGE_IMAGE_BASE_URL}${poster}`}
                className="img-fluid"
                alt={`Movie ${index + 1}`}
              />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default GenreCard;
