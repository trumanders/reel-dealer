import Navigation from "./components/Navigation";
import "./assets/scss/App.scss";
import SearchResultsPage from "./pages/SearchResultsPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import MoviePage from "./pages/MoviePage";
import PersonPage from "./pages/PersonPage";
import Genres from "./pages/GenresPage";
import MoviesByGenre from "./pages/MoviesByGenrePage";

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:id" element={<MoviesByGenre />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
