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
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={handleSearchClick}
          />
        </Col>
      </Row>
    // </Container>
//   </div>
  );
};

export default SearchBar;
