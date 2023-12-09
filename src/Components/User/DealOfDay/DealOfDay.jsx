import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./dealOfDay.css"; // Đảm bảo bạn đã tạo file CSS này
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DealOfDay = () => {
  const [dealSale, setSale] = useState([]);
  useEffect(() => {
    const APIDealSale = () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}dealSale`)
        .then((response) => {
          setSale(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          dealSale([]);
        });
    };
    APIDealSale();
  }, []);
  const countdownTimer = "0:10:15";
  const mapDealSale = dealSale.map((e) => e.newDealSale);

  return (
    <Container fluid className="deal-of-day-container">
      {/* Khung thông tin deal */}
     {
      dealSale?.map(sale => (
       <div>
         {
          sale.newDealSale.map((item) => (
            <Row className="justify-content-md-center deal-info">
            <Col md={12} className="text-center">
              <div className="countdown-timer">{item.saleTime}</div>
              <h2 className="deal-title">DEAL NGON GIÁ SỐC</h2>
            </Col>
          </Row>
          ))
        }
       </div>
      ))
     }
      {dealSale?.length > 0 && (
        <Row>
          {dealSale.map(
            (product) =>
              product.newDealSale &&
              product.newDealSale.length > 0 && ( // Check if newDealSale has data
                <Col
                  key={product.id}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  className="mb-4"
                >
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src={product.img[0]}
                      className="product-image"
                    />
                    <Card.Body>
                      <Link to={`/product/${product.slug}`}>
                        <Card.Title className="product-name">
                          {product.name}
                        </Card.Title>
                      </Link>
                      <div className="product-pricing">
                        {product.newDealSale.map((item) => (
                          <div key={item.id}>
                            {" "}
                            {/* Make sure to add a unique key here */}
                            <Card.Text className="product-price">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.total)}
                            </Card.Text>
                            <Card.Text className="product-quantity">
                              Số lượng {item.quantity}
                            </Card.Text>
                          </div>
                        ))}
                        <Card.Text className="product-original-price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </Card.Text>
                      </div>
                      <div className="product-meta">
                        <Card.Text className="product-discount">
                          {product.discount}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>
      )}
    </Container>
  );
};

export default DealOfDay;
