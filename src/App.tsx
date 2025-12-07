import { BrowserRouter } from "react-router";
import Navigation from "./components/Navigation";
import "./assets/scss/App.scss";
import SearchResultsPage from "./pages/SearchResultsPage";

const App = () => {
  return (
    <>
      <h1>THE MOVIE DATABASE</h1>
      <Navigation />
      <SearchResultsPage />
    </>
  );
};

export default App;
