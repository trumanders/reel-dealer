import MovieCardComponent from "../components/MovieCardComponent";
import { useMovies } from "../contexts/MovieContext";

const SearchResultsPage = () => {
  const { searchResponse } = useMovies();
  return (
    <>
      <h1>SEARCH RESULTS:</h1>
      {searchResponse ? (
        <div>
          {searchResponse.results.map((movie) => (
            <div key={movie.id}>
              <MovieCardComponent movieCard={movie} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SearchResultsPage;
