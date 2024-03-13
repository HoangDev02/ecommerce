import React from "react";
import { Card, ListGroup, ListGroupItem, Container } from "react-bootstrap";
import "./orderItem.css";

const OrderItem = ({ order }) => {
  const {
    _id,
    products,
    subtotal,
    name,
    phone,
    address,
    paymentMethod,
    createdAt,
  } = order;

  return (
    <Container className="orderItemContainer">
      <Card className="orderCard">
        <Card.Body className="orderCardBody">
          <Card.Subtitle className="mb-2 text-muted orderSubtitle">
            Tên: {name}
          </Card.Subtitle>
          <Card.Text className="orderDetails">
            Số điện thoại: {phone}
            <br />
            Phương thức thanh toán: {paymentMethod}
            <br />
            ngày mua: {new Date(createdAt).toLocaleString()}
          </Card.Text>
          <ListGroup className="addressListGroup">
            <ListGroupItem className="addressListItem">
              Địa chỉ:
              <br />
              tỉnh: {address[0].city}
              <br />
              Huyện: {address[0].district}
              <br />
              Xã/ Phường: {address[0].ward}
              <br />
              Tên Đường/ số Nhà: {address[0].streetname}
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <ListGroup className="productListGroup">
          {products.map((product, index) => (
            <ListGroupItem key={index} className="productListItem">
              Tên sản phẩm: {product.name}
              <br />
              Số lượng: {product.quantity}
              <br />
              Giá: {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.price)}
            </ListGroupItem>
          ))}
        </ListGroup>

        <Card.Body>
          <Card.Text className="orderTotal">
            Tổng giá tiền: {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(subtotal)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderItem;
