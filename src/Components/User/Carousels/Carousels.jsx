import React, { useEffect, useState } from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carousels.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
const Carousels = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const APIBaner = () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}banners`)
        .then((response) => {
          setBanner(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setBanner([]);
        });
    };
    APIBaner();
  }, []);

  return (
    <Container className="p-3 banner">
      <Row className="carousel-home">
        <Col md={8}>
          <Carousel className="main-carousel ">
            {Array.isArray(banner) &&
              banner.map((item) => (
                <Carousel.Item key={item._id}>
                  <img
                    className="d-block w-100"
                    src={`${process.env.REACT_APP_BACKEND_URL}${item.img[0]}`}
                    alt={item.description}
                  />
                  {Array.isArray(item.newBaner) &&
                    item.newBaner.map((product) => (
                      <Carousel.Caption key={product._id}>
                        <Link to={`/product/${product.slug}`}>
                          {product.name}
                        </Link>
                      </Carousel.Caption>
                    ))}
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
        <Col md={4}>
          {banner.slice(0, 2).map((product, index) => (
            <div className="banner-item" key={index}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${product.img[1]}`}
                alt={`product-${index}`}
              />
              <div className="overlay">
                <div className="overlay-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-center pt-5">
        <Col md="auto">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>🚚 Vận chuyển MIỄN PHÍ</Card.Title>
              <Card.Text>Trong khu vực TPHCM</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md="auto">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>🔄 Đổi trả MIỄN PHÍ</Card.Title>
              <Card.Text>Trong vòng 30 NGÀY</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md="auto">
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Title>💳 Tiến hành THANH TOÁN</Card.Title>
              <Card.Text>Với nhiều PHƯƠNG THỨC</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md="auto">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>🔙 100% HOÀN TIỀN</Card.Title>
              <Card.Text>nếu sản phẩm lỗi</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carousels;
