import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../../redux/API/apiRequestProduct';
import { addCart } from '../../../redux/API/apiRequestcart';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './productUser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ImageZoom from 'react-image-zoom';

const ProductUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const productDetail = useSelector((state) => state.products.detailProduct?.product);
  const [quantity, setQuantity] = useState(1);
  const userId = user?._id;
  const navigate = useNavigate();

  const handleAddCart = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const newProduct = {
      productId: productDetail._id,
      name: productDetail.name,
      price: productDetail.price,
      img: productDetail.img,
      quantity,
    };
    addCart(newProduct, dispatch, navigate, userId);
    // Show toast notification
    toast.success('Sản phẩm đã được thêm vào giỏ hàng', { autoClose: 3000 });
  };

  useEffect(() => {
    getProduct(dispatch, id);
  }, [dispatch, id]);

  const options = {
    width: 400,
    zoomWidth: 500,
    scale: 1.5,
    offset: { vertical: 0, horizontal: 10 },
  };

  return (
    <Container className="product_section layout_padding">
      <Row>
        <Col md={6}>
          <ImageZoom
            {...options}
            img={productDetail?.img}
            zoomImg={productDetail?.img}
            alt="Product Image"
          />
        </Col>
        <Col md={6}>
          <div className="card_content">
            <div className="card_description">
              <h3 className="Card_name">{productDetail?.name}</h3>
              <p className="card_id">SKU: {productDetail?._id}</p>
              <p className="card_price">{productDetail?.price}.000 VNĐ</p>
              <p className="card_description">{productDetail?.description}</p>
              <Form onSubmit={handleAddCart}>
                <Form.Group controlId="quantity">
                  <Form.Label>Số lượng:</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => {
                      if (e.target.value >= 1) {
                        setQuantity(e.target.value);
                      }
                    }}
                  />
                </Form.Group>
                <Button type="submit" variant="outline-danger">
                  Buy Now
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default ProductUser;
