import { useEffect, useState } from "react";
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
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/logo.png";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getCart } from "../../redux/API/apiRequestcart";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const carts = useSelector((state) => state.carts.cartItems?.allCart.products);

  const id = user?._id;
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = () => {
    logOut(dispatch, navigate,accessToken);
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
  useEffect(() => {
    if (user?.accessToken) {
      getCart(accessToken, dispatch, id);
    }
  }, []);
  return (
    <Navbar expand="lg" variant="light" className="navbar">
      <Container fluid className="navbar-container">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand href="/" className="logo">
              <img
                src={Logo}
                width="70"
                height="70"
                className="d-inline-block align-top"
                alt="logo"
              />
              <span className="logo-span">ecommerce</span>
            </Navbar.Brand>
            <Nav className="nav-center">
              <Nav.Link href="/" className="navbar-link text-white">
                Trang chủ
              </Nav.Link>
              <Nav.Link href="/product" className="navbar-link text-white">
                Sản phẩm
              </Nav.Link>
              <Nav.Link href="#pricing" className="navbar-link text-white">
                Giới thiệu
              </Nav.Link>
              <Nav.Link href="#pricing" className="navbar-link text-white">
                Tin tức
              </Nav.Link>
              <Nav.Link href="#pricing" className="navbar-link text-white">
                Liên hệ
              </Nav.Link>
            </Nav>
            <Nav className="navbar-right">
              <Link to={`/cart/${id}`} className="navbar-link text-white">
                Tra cứu đơn hàng
              </Link>
              {searchVisible && (
                <Form className="d-flex" onSubmit={handleSearchClick}>
                  {/* <div className="search-box"> */}
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="search"
                  />
                </Form>
              )}
              <FontAwesomeIcon
                icon={faSearch}
                className="navbar-icon text-white"
                onClick={handleSearchClick}
              />

              <Link
                to={`cart/${id}`}
                className={`navbar-icon ${
                  carts && carts.length > 0 ? "cart-has-item" : ""
                }`}
              >
                <FontAwesomeIcon icon={faCartShopping} className="text-white" />
                {carts && carts.length > 0 && (
                  <span className="badge ">{carts.length}</span>
                )}
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
                          // to="/logout"
                          className="navbar-logout "
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
                  <Link to="/login" className="navbar-link text-white">
                    Login
                  </Link>
                  <Link to="/register" className="navbar-link text-white">
                    Register
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>
  );
};

export default NavBar;
