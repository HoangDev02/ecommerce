import React from "react";
import { Row, Col, Card, CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Search = () => {
  const productList = useSelector((state) => state.searchs.search?.allSearch);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2 className="pt-5">
            <span>Products</span>
          </h2>
        </div>
        {productList?.length > 0 ? (
          <div className="row">
            {productList.map((item) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={item._id}>
                <div className="box">
                  <Col>
                    <Card className="card-product">
                      <div className="img-box">
                        {item?.img.length > 0 && (
                          <Card.Img
                            variant="top"
                            src={`${process.env.REACT_APP_BACKEND_URL}${item.img[0]}`}
                            alt="image"
                            className="card-img-product"
                          />
                        )}
                      </div>
                      <Card.Body className="detail-box">
                        <Card.Title>
                          <Link to={`/product/${item.slug}`}>
                            <span className="product-span-name">
                              {item.name}
                            </span>
                          </Link>
                        </Card.Title>
                        <Card.Title>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h4>Không tìm thấy sản phẩm</h4>
          </div>
        )}
        <div className="pagination-container">
          {/* <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Search;
