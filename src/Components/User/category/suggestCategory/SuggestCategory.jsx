import React, { useEffect } from "react";
import { getSuggestCategory } from "../../../../redux/API/apiRequestCategory";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, CardGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./suggestCateogory.css";
function SuggestCategory() {
  const dispatch = useDispatch();
  const categoriesSuggestList = useSelector(
    (state) => state.categories.suggestCategory?.suggest
  );
  useEffect(() => {
    getSuggestCategory(dispatch);
  }, []);
  return (
    <div>
      {categoriesSuggestList?.map((item) => (
        <div className="category-suggest">
          <h2>sản phẩm gợi ý</h2>
          {item.suggestedProducts.map((product) => (
            <div key={product._id} className="product-row">
              <Col>
                <Card className="card-product card-suggest">
                  <Row>
                    <Col md={4}>
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
                    </Col>
                    <Col md={8}>
                      <Card.Body className="detail-box">
                        <Card.Title>
                          <Link to={`/product/${product.slug}`}>
                            <span className="category-suggest-name">
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
                    </Col>
                  </Row>
                </Card>
              </Col>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SuggestCategory;
