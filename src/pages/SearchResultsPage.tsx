import { Container } from "react-bootstrap";
import MovieCardComponent from "../components/MovieCardComponent";
import { useMovies } from "../contexts/MovieContext";
import MovieList from "../components/MovieList";

const SearchResultsPage = () => {
  const { isLoading } = useMovies();
  const { searchResponse } = useMovies();

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <MovieList
      className="movies-by-genre"
      movies={searchResponse?.results ?? null}
      title="Search Results"
      renderMovie={(movie) => (
        <div key={movie.id}>
          <MovieCardComponent searchMovie={movie} />
        </div>
      )}
    />
  );
};

export default SearchResultsPage;
