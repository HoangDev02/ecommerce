import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dealOfDay.css"; // Make sure this CSS file exists and is correctly styled
import { useWindowSize } from "react-use";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DealOfDay = () => {
  const [dealSale, setSale] = useState([]);
  const [deletedSales, setDeletedSales] = useState(new Set());
  const { width } = useWindowSize();

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
      const currentTime = new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      dealSale.forEach((product, productIndex) => {
        product.newDealSale.forEach((sale) => {
          if (sale.saleTime === currentTime && !deletedSales.has(sale._id)) {
            const newProduct = {
              productId: sale.productId,
            };
            axios
              .delete(
                `${process.env.REACT_APP_BACKEND_URL}dealSale/${sale._id}`,
                newProduct
              )
              .then(() => {
                // Cập nhật state để loại bỏ sale đã xóa
                setSale((currentSales) => {
                  const newSales = [...currentSales];
                  const newDealSales = newSales[
                    productIndex
                  ].newDealSale.filter((deal) => deal._id !== sale._id);
                  newSales[productIndex].newDealSale = newDealSales;
                  return newSales;
                });
                // Thêm ID của sale đã xóa vào Set
                setDeletedSales((prevDeletedSales) => {
                  const updatedDeletedSales = new Set(prevDeletedSales);
                  updatedDeletedSales.add(sale._id);
                  return updatedDeletedSales;
                });
              })
              .catch((error) => {
                console.error("Error deleting sale:", error);
              });
          }
        });
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [dealSale, deletedSales]);

  // Cài đặt cấu hình carousel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container fluid className="deal-of-day-container">
      <Row className="justify-content-md-center deal-info ">
        <Col md={3} sm={4} className="countdown-timer">
          0:00:00:00
        </Col>
        <Col md={7} sm={8} className="countdown-timer">
          <div>CÁC SẢN PHẨM ĐANG ĐƯỢC GIẢM GIÁ!!!</div>
        </Col>
        <Col
          md={2}
          sm={1}
          style={{ display: width <= 768 ? "none" : "inherit" }}
          className="watch-all"
        >
          <Link to={"/"}>Xem tất cả</Link>
        </Col>
      </Row>

      {dealSale.length > 0 && (
        <div>
          {dealSale.length > 5 ? (
            <Slider {...settings}>
              {dealSale.map((product,index) =>
                product.newDealSale && product.newDealSale.length > 0 ? (
                  <div key={index} className="mb-4">
                    <Card className="product-card">
                      <div className="img-box">
                        {product?.img.length > 0 && (
                          <Card.Img
                            variant="top"
                            src={`${process.env.REACT_APP_BACKEND_URL}${product.img[0]}`}
                            alt="image"
                            className="card-img-product"
                          />
                        )}
                      </div>
                      <Card.Body className="detail-box p-6">
                        <Link to={`/product/${product.slug}`}>
                          <Card.Title className="product-name" >
                            <span className="product-span-name">
                              {product.name}
                            </span>
                          </Card.Title>
                        </Link>
                        <div className="product-pricing">
                          {product.newDealSale.map((item) => (
                            <div key={item.id}>
                              <Card.Text className="product-box-price">
                                <span>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.total)}
                                </span>
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
                  </div>
                ) : (
                 null
                )
              )}
            </Slider>
          ) : (
            dealSale.map((product) =>
              product.newDealSale && product.newDealSale.length > 0 ? (
                <div key={product.id} className="mb-4">
                  <Card className="product-card">
                    <div className="img-box">
                      {product?.img.length > 0 && (
                        <Card.Img
                          variant="top"
                          src={product.img[0]}
                          alt="image"
                          className="card-img-product"
                        />
                      )}
                    </div>
                    <Card.Body className="detail-box p-6">
                      <Link to={`/product/${product.slug}`}>
                        <Card.Title className="product-name">
                          <span className="product-span-name">
                            {product.name}
                          </span>
                        </Card.Title>
                      </Link>
                      <div className="product-pricing">
                        {product.newDealSale.map((item) => (
                          <div key={item.id}>
                            <Card.Text className="product-box-price">
                              <span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(product.price)}
                              </span>
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
                </div>
              ) : (
                <div key={product.id}></div>
              )
            )
          )}
        </div>
      )}
    </Container>
  );
};

export default DealOfDay;
