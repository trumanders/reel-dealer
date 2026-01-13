import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import { ButtonGroup, Nav, ToggleButton } from "react-bootstrap";
import { useTheme } from "../contexts/useTheme.tsx";
import { useEffect } from "react";

const Navigation = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          REEL DEALER
        </Navbar.Brand>
        <div className="mt-3 mx-1">
          <Search />
        </div>
        <Nav>
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              "browse-by-genre-button px-3 py-1 nav-link ms-0" +
              (isActive ? " active-genre" : "")
            }
          >
            BROWSE BY GENRE
          </NavLink>
          <ButtonGroup size="sm">
            <ToggleButton
              className="ms-5"
              id="toggle-dark-theme"
              type="checkbox"
              variant="outline-light"
              checked={!isDarkMode}
              onClick={() => toggleTheme()}
              value="light"
            >
              {isDarkMode ? "DARK MODE" : "LIGHT MODE"}
            </ToggleButton>
          </ButtonGroup>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
