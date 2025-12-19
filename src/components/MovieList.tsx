interface MovieListProps<TMovie> {
  movies: TMovie[] | null;
  title: string;
  renderMovie: (movie: TMovie) => React.ReactNode;
  className: string;
}

const MovieList = <TMovie,>({
  className,
  movies,
  title,
  renderMovie,
}: MovieListProps<TMovie>) => (
  <>
    <h2>{title}</h2>
    <div className={className}>
      {movies && movies.length > 0 ? (
        movies.map(renderMovie)
      ) : (
        <div>No movies found.</div>
      )}
    </div>
  </>
);

export default MovieList;
