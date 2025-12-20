import MovieCardComponent from "../components/MovieCardComponent";
import { useMovies } from "../contexts/MovieContext";
import MovieList from "../components/MovieList";
import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PaginationComponent from "../components/PaginationComponent";
import { Container } from "react-bootstrap";

const SearchResultsPage = () => {
  const {
    isLoading,
    searchResponse,
    handleSearch,
    page,
    handlePageClick,
    syncPageWithURL,
    error,
  } = useMovies();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    const currentPage = syncPageWithURL(location.search);

    if (query) {
      handleSearch(query, currentPage);
    }
  }, [location.search, query]);

  if (error) {
    return <p>{error}</p>;
  }

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <Container>
      <MovieList
        className="movie-list"
        movies={searchResponse?.results ?? null}
        title="Search Results"
        renderMovie={(movie) => (
          <div key={movie.id}>
            <MovieCardComponent searchMovie={movie} />
          </div>
        )}
      />
      <PaginationComponent
        page={page}
        totalPages={searchResponse?.total_pages || 0}
        onPageClick={(direction) => handlePageClick(direction, location.search)}
      />
    </Container>
  );
};

export default SearchResultsPage;
