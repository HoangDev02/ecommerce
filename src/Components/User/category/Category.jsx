import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCategory } from '../../../redux/API/apiRequestCategory';

const Category = () => {
  const { slug } = useParams();
  const categoriesList = useSelector((state) => state.categories.detailCategory?.Category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      getCategory(dispatch, slug);
    }
  }, [dispatch, slug]);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2 className="pt-5">
            <span>Products</span>
          </h2>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {categoriesList?.map((item) => (
            item.category.map((category) => (
              <Col key={category._id}>
                <Card>
                  <Link to={`/product/${category.slug}`}>
                    <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_URL}${category.img[0]}`} alt="image" />
                    <Card.Title>{category.name}</Card.Title>
                  </Link>
                  <Card.Body>
                    <Card.Text>${category.price}</Card.Text>
                  </Card.Body>
               
                </Card>
              </Col>
            ))
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Category;
