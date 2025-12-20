import { Button, Form, InputGroup } from "react-bootstrap";
import { useMovies } from "../contexts/MovieContext";
import { useNavigate } from "react-router";

const Search = () => {
  const navigate = useNavigate();
  const { searchText, setSearchText, handleSearch } = useMovies();

  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = searchText.trim();
    handleSearch(trimmedText);
    navigate(`/search?q=${encodeURIComponent(trimmedText)}`);
  };

  return (
    <div className="d-flex align-items-center">
      <Form id="search-form" onSubmit={(e) => onSearch(e)}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={searchText}
            onChange={(e) => handleSearchTextChange(e.target.value)}
          />
          <Button variant="success" type="submit">
            🔍
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Search;
