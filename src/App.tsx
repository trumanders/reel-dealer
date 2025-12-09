import Navigation from "./components/Navigation";
import "./assets/scss/App.scss";
import SearchResultsPage from "./pages/SearchResultsPage";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import MoviePage from "./pages/MoviePage";

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
