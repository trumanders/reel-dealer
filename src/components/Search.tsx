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
    handleSearch(searchText.trim());
    navigate(`/`);
  };

  return (
    <div id="search-wrapper">
      <Form id="search-form" onSubmit={(e) => onSearch(e)}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search movies..."
            aria-label="City"
            aria-details="Search for city to show current weather for."
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
