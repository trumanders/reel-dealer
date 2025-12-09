import MovieCardComponent from "../components/MovieCardComponent";
import { useMovies } from "../contexts/MovieContext";

const SearchResultsPage = () => {
  const { searchResponse } = useMovies();
  return (
    <>
      <div className="searchResults">
        {searchResponse && searchResponse.results.length > 0 ? (
          <div>
            {searchResponse.results.map((movie) => (
              <div key={movie.id}>
                <MovieCardComponent movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div>No search results to display.</div>
        )}
      </div>
    </>
  );
};

export default SearchResultsPage;
