import { useState } from "react";
import { Container, Nav, Button, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";

const NaBvar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/#/">e-comerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/#/">Home</Nav.Link>

              <Nav.Link href="/#/Purchases">Purchases</Nav.Link>
              {token ? (
                <Nav.Link onClick={logOut}>Log out</Nav.Link>
              ) : (
                <Nav.Link href="/#/Login">Login</Nav.Link>
              )}
         

              {/* <Nav.Link style={{marginLeft:"250%"}}><i className="fa-solid fa-cart-shopping"></i></Nav.Link> */}
              {/* <Nav.Link as ={Button} onClick={logOut} className="btn btn-dark" style={{color:'white'}}>Log out</Nav.Link> */}
              {/* <Nav.Link href="/#/products/:id">Products</Nav.Link> */}
            
              <Nav.Link onClick={handleShow} >
                <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
            </Nav>
       

          </Navbar.Collapse>
        </Container>
    
      </Navbar>
       <CartSidebar  show={show} handleClose={handleClose}/>
    </>
  );
};

export default NaBvar;
