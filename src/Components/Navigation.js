import {
    Container,
    Nav,
    Navbar
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Cisco Gen</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">Router</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/switch">Switch</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}