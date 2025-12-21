import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import { Nav } from "react-bootstrap";

const Navigation = () => {
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
            BY GENRE
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
