import { Button } from "react-bootstrap";

interface PaginationComponentProps {
  page: number;
  totalPages: number;
  onPageClick: (direction: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  page,
  totalPages,
  onPageClick,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="prev">
        <Button
          disabled={page < 2}
          variant="primary"
          onClick={() => onPageClick(-1)}
        >
          Previous Page
        </Button>
      </div>

      <div className="page">{`page ${page} of ${totalPages}`}</div>

      <div className="next">
        <Button
          disabled={page === totalPages - 1}
          variant="primary"
          onClick={() => onPageClick(1)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default PaginationComponent;
