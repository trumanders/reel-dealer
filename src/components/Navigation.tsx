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
        <Search />
        <Navbar.Collapse>
          <Nav>
            <NavLink
              to="/genres"
              className={({ isActive }) =>
                "px-4 py-2 nav-link ms-4" + (isActive ? " active-genre" : "")
              }
            >
              BROWSE BY GENRES
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
