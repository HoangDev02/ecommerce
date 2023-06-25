import React from 'react';
import { Row, Col, Card, CardGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductHome } from '../../../redux/API/apiRequestProduct';
import { getCategory } from '../../../redux/API/apiRequestCategory';

const Category = () => {
  const { slug } = useParams();
  const categoriesList = useSelector((state) => state.categories.detailCategory?.Category);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategory(dispatch, slug);
  }, [dispatch, slug]);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2 className="pt-5">
            <span> Products</span>
          </h2>
        </div>
        <div className="row row-cols-4">
          {categoriesList?.map((item) =>
            item.category.map((category) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={category._id}>
                <div className="box">
                  <Col>
                    <Card>
                      <div className="option_container">
                        <div className="options">
                          <Link to={`/product/${category.slug}`} className="option1">
                            Details
                          </Link>
                        </div>
                      </div>
                      <div className="img-box">
                        <Card.Img variant="top" src={category.img} alt="image" />
                      </div>
                      <Card.Body className="detail-box">
                        <Card.Title>{category.name}</Card.Title>
                        <Card.Title>${category.price}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </div>
            ))
          )}
        </div>
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

export default Category;
