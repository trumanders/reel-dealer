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
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SearchResultsPage;
