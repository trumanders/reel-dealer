import Navigation from "./components/Navigation";
import "./assets/scss/App.scss";
import SearchResultsPage from "./pages/SearchResultsPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import MoviePage from "./pages/MoviePage";
import PersonPage from "./pages/PersonPage";
import Genres from "./pages/GenresPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import { useEffect } from "react";
import { useTheme } from "./contexts/useTheme.tsx";

const App = () => {
  return (
    <>
      <ThemeContextProvider>
        <Navigation />
      </ThemeContextProvider>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:id" element={<MoviesByGenrePage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
