import React from "react";
import { Row, Col, Card, CardGroup, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductHome } from "../../../redux/API/apiRequestProduct";
import { getCategoryHome } from "../../../redux/API/apiRequestCategory";
import "./homeUser.css";
import ReactPaginate from "react-paginate";
import DealOfDay from "../DealOfDay/DealOfDay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const isMobile = window.innerWidth <= 768;

  const categoriesList = useSelector(
    (state) => state.categories.categories?.allCategory
  );
  const newCategory = categoriesList?.map((item) => item.newCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          slidesToShow: 2,
        },
      },
    ],
  };
  useEffect(() => {
    getCategoryHome(dispatch);
  }, [dispatch]);

  return (
    <Container fluid={isMobile}>
      <section className="product_section layout_padding pt-10">
        <CardGroup className="card-group-category">
          <Row xs={4} md={5} xl={7} className="g-4">
            {categoriesList?.slice(0, 7).map((item, idx) => (
              <Col key={idx}>
                <Card className="card-category">
                  <Link to={`/category/${item.slug}`}>
                    <Card.Img
                      variant="top"
                      src={item.img}
                      className="card-img-categories "
                    />
                    <Card.Body>
                      <Card.Title className="category-name-home">
                        {item.name}
                      </Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          {/* font-end deal */}
        </CardGroup>
        <DealOfDay />
        <div className="heading_container heading_center">
          <h2 className="pt-5">
            Sản phẩm
            <span> đọc quyền</span>
          </h2>
        </div>
        <Row>
          {categoriesList?.map((item) => (
            <div>
              {item.newCategory.length > 0 && (
                <Row className="wrapper-content">
                  {item.newCategory.length > 0 && (
                    <Row>
                      <Col md={10} lg={11}>
                      <h3 className="text-start category-name">{item.name}</h3>

                      </Col>
                      <Col md={2} lg={1} className="watch-all"><Link to={`/category/${item.slug}`}>Xem tất cả</Link></Col>
                    </Row>
                  )}
                  {item.newCategory?.length > 4 ? (
                    <Slider {...settings}>
                      {item.newCategory.map((product) => (
                        <div key={product._id}>
                          <Col>
                            <Card className="card-product">
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
                              <Card.Body className="detail-box">
                                <Card.Title>
                                  <Link to={`/product/${product.slug}`}>
                                    <span className="product-span-name">
                                      {product.name}
                                    </span>
                                  </Link>
                                </Card.Title>

                                <Card.Title className="product-box-price">
                                  <span>
                                    {new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(product.price)}
                                  </span>
                                </Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    item.newCategory?.map((product) => (
                      <div
                        className="col-sm-6 col-md-4 col-lg-3"
                        key={product._id}
                      >
                        <Col>
                          <Card className="card-product">
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
                            <Card.Body className="detail-box">
                              <Card.Title>
                                <Link to={`/product/${product.slug}`}>
                                  <span className="product-span-name">
                                    {product.name}
                                  </span>
                                </Link>
                              </Card.Title>
                              <Card.Title>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(product.price)}
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </Col>
                      </div>
                    ))
                  )}
                </Row>
              )}
            </div>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default HomeUser;
