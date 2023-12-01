import React from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carousels.css";

const Carousels = () => {
  const mainProduct = [
    {
      name: "Galaxy A14 Bản 5G",
      price: "3.190K",
      description: "Cam kết giá rẻ",
      image:
        "https://bizweb.dktcdn.net/100/497/960/themes/923878/assets/slider_1.jpg?1698914220683",
    },
  ];
  const sideProducts = [
    {
      image:
        "https://bizweb.dktcdn.net/100/497/960/themes/923878/assets/slider_1.jpg?1698914220683",
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/497/960/themes/923878/assets/slider_1.jpg?1698914220683",
    },
  ];
  return (
    <Container className="p-0">
      <Row noGutters>
        <Col md={8}>
          <Carousel className="main-carousel">
            {mainProduct.map((items) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={items.image}
                  alt={items.name}
                />
                <Carousel.Caption>
                  <h3>{items.name}</h3>
                  <p>{items.description}</p>
                  <p className="price">{items.price}</p>
                  <p className="old-price">{items.oldPrice}</p>
                  <Button variant="warning" className="buy-now-btn">
                    MUA NGAY
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={4}>
          {sideProducts.map((product, index) => (
            <Carousel
              className="mb-2 side-product-card"
              key={`side-product-${index}`}
            >
              <img
                className="d-block w-100"
                src={product.image}
                alt={product.name}
              />
            </Carousel>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
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
