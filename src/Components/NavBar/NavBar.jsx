import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/API/apiRequest";
import { searchProduct } from "../../redux/API/apiSearch";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../redux/createInstance";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/logo.png";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const id = user?._id;
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
    // console.log(user);
  };

  const handleSearchClick = async () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      searchProduct(dispatch, searchQuery);
      navigate(`/search?search=${searchQuery}`);
    }
  };
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Navbar expand="lg" variant="light" className="navbar">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            width="70"
            height="70"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-center">
            <Nav.Link href="/" className="navbar-link">
              Trang chủ
            </Nav.Link>
            <Nav.Link href="/product" className="navbar-link">
              Sản phẩm
            </Nav.Link>
            <Nav.Link href="#pricing" className="navbar-link">
              Giới thiệu
            </Nav.Link>
            <Nav.Link href="#pricing" className="navbar-link">
              Tin tức
            </Nav.Link>
            <Nav.Link href="#pricing" className="navbar-link">
              Liên hệ
            </Nav.Link>
          </Nav>
          <Nav className="navbar-right">
            <FontAwesomeIcon
              icon={faSearch}
              className="navbar-icon"
              onClick={handleSearchClick}
            />
            {searchVisible && (
              <form onSubmit={handleSearchClick}>
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="search"
                  />
                </div>
              </form>
            )}
            <Link to={`cart/${id}`} className="navbar-icon">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            {user ? (
              <div class="navbar">
                <Navbar.Brand href="/">
                  <div class="user-dropdown">
                    <img
                      src={user?.image}
                      width="40"
                      height="40"
                      className="d-inline-block align-top avatar"
                      alt="User avatar"
                    />
                    <div class="dropdown-content">
                      <span className="navbar-username">{user.username}</span>
                      <Link
                        to="/logout"
                        className="navbar-logout"
                        onClick={handleLogout}
                      >
                        Log out
                      </Link>
                    </div>
                  </div>
                </Navbar.Brand>
              </div>
            ) : (
              <>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
