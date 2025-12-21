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
    <div className="custom-pagination d-flex justify-content-between align-items-center">
      <div className="prev">
        <Button
          disabled={page < 2}
          variant="outline-light"
          onClick={() => onPageClick(-1)}
        >
          {"<"}
        </Button>
      </div>

      <div className="page">{`${page} / ${totalPages}`}</div>

      <div className="next">
        <Button
          className="pagination-button"
          disabled={page >= totalPages}
          variant="outline-light"
          onClick={() => onPageClick(1)}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default PaginationComponent;
