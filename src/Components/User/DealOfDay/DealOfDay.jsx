import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dealOfDay.css"; // Make sure this CSS file exists and is correctly styled

const DealOfDay = () => {
  const [dealSale, setSale] = useState([]);
  const [deletedSales, setDeletedSales] = useState(new Set());
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}dealSale`
        );
        setSale(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSale([]); // Reset the state in case of an error
      }
    };

    fetchDeals();

  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });
      dealSale.forEach((product, productIndex) => {
        product.newDealSale.forEach((sale) => {
          console.log("sale" + sale.saleTime === currentTime);
          if (sale.saleTime === currentTime && !deletedSales.has(sale._id)) {
            const newProduct = {
              productId : sale.productId
            }
            axios
              .delete(`${process.env.REACT_APP_BACKEND_URL}dealSale/${sale._id}`,newProduct)
              .then(() => {
                // Cập nhật state để loại bỏ sale đã xóa
                setSale(currentSales => {
                  const newSales = [...currentSales];
                  const newDealSales = newSales[productIndex].newDealSale.filter(deal => deal._id !== sale._id);
                  newSales[productIndex].newDealSale = newDealSales;
                  return newSales;
                });
                // Thêm ID của sale đã xóa vào Set
                setDeletedSales(prevDeletedSales => {
                  const updatedDeletedSales = new Set(prevDeletedSales);
                  updatedDeletedSales.add(sale._id);
                  return updatedDeletedSales;
                });
              })
              .catch(error => {
                console.error('Error deleting sale:', error);
              });
          }
        });
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [dealSale, deletedSales]); 

  return (
    <Container fluid className="deal-of-day-container">
      {dealSale.map((sale, index) => (
        <div key={index}>
          {sale.newDealSale.map((item) => (
            <Row key={item.id} className="justify-content-md-center deal-info">
              <Col md={12} className="text-center">
                <div className="countdown-timer">
                  Sale Time: {item.saleTime}
                </div>
                <h2 className="deal-title">DEAL NGON GIÁ SỐC</h2>
              </Col>
            </Row>
          ))}
        </div>
      ))}
      {dealSale.length > 0 && (
        <Row>
          {dealSale.map((product) =>
            product.newDealSale && product.newDealSale.length > 0 ? (
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
            ) : null
          )}
        </Row>
      )}
    </Container>
  );
};

export default DealOfDay;
