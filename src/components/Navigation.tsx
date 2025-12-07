import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import Search from "./Search";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          REEL DEALER
        </Navbar.Brand>
        <Search />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              HEJ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/todos" end>
              DIN
            </Nav.Link>
            <Nav.Link as={NavLink} to="/todos/add" end>
              GOING
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
