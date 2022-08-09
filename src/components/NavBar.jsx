import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NaBvar = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/#/">e-comerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link href="/#/">Home</Nav.Link>
              {/* <Nav.Link href="/#/products/:id">Products</Nav.Link> */}
              <Nav.Link href="/#/Purchases">Purchases</Nav.Link>
              <Nav.Link href="/#/Login">Login</Nav.Link>
              <Nav.Link style={{marginLeft:"450%"}}><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
       
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NaBvar;