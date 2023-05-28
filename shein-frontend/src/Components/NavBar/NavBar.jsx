import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../redux/createInstance";
import "./navbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const user = useSelector((state)=> state.auth.login.currentUser);
  const id = user?._id;
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user,dispatch,logoutSuccess);
  
  const handleLogout = () =>{
    logOut(dispatch,id,navigate, accessToken, axiosJWT);
  }

  return (
    <Navbar expand="lg" variant="light" className="navbar">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://classic.vn/wp-content/uploads/2022/04/logo-shopee.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          Shoppe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="navbar-link">Home</Nav.Link>
            <Nav.Link href="/" className="navbar-link">Page</Nav.Link>
            <Nav.Link href="/product" className="navbar-link">Products</Nav.Link>
            <Nav.Link href="#pricing" className="navbar-link">Blog</Nav.Link>
            <Nav.Link href="#pricing" className="navbar-link">Contact us</Nav.Link>
            <NavDropdown title="Shop" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="navbar-right">
            <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
            <Link to={`cart/${id}`} className="navbar-icon">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            {user ? (
              <>
                <span className="navbar-username">Hi, {user.username}</span>
                <Link to="/logout" className="navbar-logout" onClick={handleLogout}>Log out</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="navbar-link">Register</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
