import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getProductHome } from '../../../redux/API/apiRequestProduct';
import { getCategoryHome } from '../../../redux/API/apiRequestCategory';
import './homeUser.scss';

const HomeUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  // const productList = useSelector((state) => state.products.products?.allProduct);
  const categoriesList = useSelector((state) => state.categories.categories?.allCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryHome(dispatch);
  }, [dispatch]);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2 className='pt-5'>
            Exclusive
            <span> Products</span>
          </h2>
        </div>
        <div className="row">
          {categoriesList?.map((item) => (
            <div>
              <h1>{item.name}</h1>
              <div  className="row" >
              {
                item.newCategory?.map((product) => (
                  <div className="col-sm-6 col-md-4 col-lg-4" key={product._id}>
                    <div className="box">
                      <Col>
                        <Card>
                          <div className="option_container">
                            <div className="options">
                              <Link to={`/product/${product.slug}`} className="option1">
                                Details
                              </Link>
                            </div>
                          </div>
                          <div className="img-box">
                            <Card.Img variant="top" src={product.img} alt="image" />
                          </div>
                          <Card.Body className="detail-box">
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Title>${product.price}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
               </div>
                ))
              }
              </div>
            </div>
          ))}
        </div>
        <div className="btn-box">
          <Link to="/product/">View All products</Link>
        </div>
      </div>
    </section>
  );
};

export default HomeUser;
