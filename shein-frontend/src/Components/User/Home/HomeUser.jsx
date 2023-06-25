import React from 'react';
import { Row, Col, Card,CardGroup } from 'react-bootstrap';
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
        <CardGroup className='card-group-category'>
        <Row xs={1} md={6} className="g-4">
      {categoriesList?.map((item) => (
        <div className='row'>
          {Array.from({ length: 1 }).map((_, idx) => (
          <Col key={idx}>
            <Card className='card-category'>
              <Link to= {`/category/${item.slug}`}>
                <Card.Img variant="top" src={item.img} />
                <Card.Title className='category-name'>{item.name}</Card.Title>
              </Link>
            </Card>
          </Col>
        ))}
        </div>
      ))}
      </Row>    
        </CardGroup>
        <div className="heading_container heading_center">
          <h2 className='pt-5'>
            Sản phẩm
            <span> đọc quyền</span>
          </h2>
        </div>
        <div className="row">
          {categoriesList?.map((item) => (
            <div>
              <h3 className='text-start category-name'>{item.name}</h3>
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
      </div>
      <br/>
      <Card className='card-home'>
        <Card.Img variant="top" src="http://mauweb.monamedia.net/bitis/wp-content/uploads/2018/03/slideshow_3.jpg" />
      </Card>
    </section>
  );
};

export default HomeUser;
