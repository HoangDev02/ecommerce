import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../redux/API/apiRequestProduct";
import { addCart } from "../../../redux/API/apiRequestcart";
import { getSuggestCategory } from "../../../redux/API/apiRequestCategory";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./productUser.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ImageZoom from "react-image-zoom";

const ProductUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const productDetail = useSelector(
    (state) => state.products.detailProduct?.product
  );
  const categoriesList = useSelector(
    (state) => state.categories.suggestCategory?.suggest
  );
  const [quantity, setQuantity] = useState(1);
  const userId = user?._id;
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState("");

  const handleAddCart = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    const newProduct = {
      productId: productDetail._id,
      name: productDetail.name,
      price: productDetail.price,
      img: currentImage,
      quantity,
    };
    addCart(newProduct, dispatch, navigate, userId);
    // Show toast notification
    toast.success("Sản phẩm đã được thêm vào giỏ hàng", { autoClose: 3000 });
  };

  useEffect(() => {
    getProduct(dispatch, id);
    getSuggestCategory(dispatch);
  }, [dispatch, id]);
  
  useEffect(() => {
    if (productDetail?.img?.length) {
      setCurrentImage(productDetail.img[0]);
    }
  }, [productDetail]);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };
  const imageProduct = productDetail?.img.map((e) => e);
  console.log(imageProduct);
  return (
    <Container className="product_section layout_padding">
      <Row>
        <Col md={6}>
          <div className="product-img">
            {/* Hiển thị hình ảnh chính */}
            {currentImage && (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${currentImage}`}
                alt="Product"
                style={{ maxWidth: "100%", height: "30rem" }} // Có thể điều chỉnh kích thước tùy ý
              />
            )}

            {/* Danh sách các hình ảnh nhỏ để click chọn */}
            <div className="product-thumbnails">
              {productDetail?.img.map((image, index) => (
                <Card.Img
                  key={index}
                  variant="top"
                  src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
                  alt="Product"
                  onClick={() => handleImageClick(image)}
                  style={{
                    cursor: "pointer",
                    maxWidth: "100px",
                    maxHeight: "100px",
                    margin: "5px",
                  }}
                />
              ))}
            </div>
          </div>
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
      <h1 className="pt-5">Các sản phẩm gợi ý</h1>
      {categoriesList?.map((item) => (
        <div className="row">
          {item.suggestedProducts?.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-4" key={product._id}>
              <div className="box">
                <Col>
                  <Card>
                    <div className="option_container">
                      <div className="options">
                        <Link
                          to={`/product/${product.slug}`}
                          className="option1"
                        >
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
          ))}
        </div>
      ))}
    </Container>
  );
};

export default ProductUser;
