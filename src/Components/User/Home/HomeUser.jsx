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

const HomeUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const categoriesList = useSelector(
    (state) => state.categories.categories?.allCategory
  );
  const newCategory = categoriesList?.map((item) => item.newCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //[GET] api category
    getCategoryHome(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <section className="product_section layout_padding">
        <CardGroup className="card-group-category">
          <Row xs={4} md={6} className="g-4">
            {categoriesList?.map((item) => (
              <div className="row">
                {Array.from({ length: 1 }).map((_, idx) => (
                  <Col key={idx}>
                    <Card className="card-category">
                      <Link to={`/category/${item.slug}`}>
                        <Card.Img
                          variant="top"
                          src={item.img}
                          className="card-img-categories "
                        />
                        <Card.Body>
                          <Card.Title className="category-name">
                            {item.name}
                          </Card.Title>
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </div>
            ))}
          </Row>
          {/* font-end deal */}
          <DealOfDay />
        </CardGroup>
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
                <h3 className="text-start category-name">{item.name}</h3>
              )}
              <Row>
                {item.newCategory?.map((product) => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                    <div className="box">
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
                              {" "}
                              <Link to={`/product/${product.slug}`}>
                                {product.name}
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
                  </div>
                ))}
              </Row>
            </div>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default HomeUser;
