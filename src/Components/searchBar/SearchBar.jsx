import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { searchProduct } from "../../redux/API/apiSearch";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./searchbar.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    // <div className="search-container">
    // <Container className="d-flex align-items-center justify-content-center">
    <Row>
      <Col>
        {searchVisible && (
          <div className="search-container">
            <Form className="search-form" onSubmit={handleSearchClick}>
              <Form.Control
                type="text"
                placeholder="Search"
                name="search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="search-input"
              />
            </Form>
          </div>
        )}
      </Col>
      <Col>
      <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className="search-icon"
      onClick={handleSearchClick}
    >
      <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
    </svg>
      </Col>
    </Row>
    // </Container>
    //   </div>
  );
};

export default SearchBar;
