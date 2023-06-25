import React from 'react';
import { Row, Col, Card, CardGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
              <div className="col-sm-6 col-md-4 col-lg-4" key={item._id}>
                <div className="box">
                  <Col>
                    <Card>
                      <div className="option_container">
                        <div className="options">
                          <Link to={`/product/${item.slug}`} className="option1">
                            Details
                          </Link>
                        </div>
                      </div>
                      <div className="img-box">
                        <Card.Img variant="top" src={item.img} alt="image" />
                      </div>
                      <Card.Body className="detail-box">
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Title>${item.price}</Card.Title>
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
