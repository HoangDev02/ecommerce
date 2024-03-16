import React, { useState } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Button,
} from "react-bootstrap";
import "./orderItem.css";
import axios from "axios";
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
    status,
  } = order;
  const [isStatus, setIsStatus] = useState(status);

  const handleCancelOrder = async () => {
    console.log(_id);
    setIsStatus(false); // This will set isStatus to false
    const cancelOrder = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}order/status`,
      {
        id: _id,
        status: false, // Send the new status in the POST request
      }
    );
    if (cancelOrder.status === 200) {
      alert("Hủy đơn hàng thành công");
      window.location.reload();
    }
    
  };

  const handleResetOrder = async () => {
    setIsStatus(true); // This will set isStatus to true
    const resetOrder = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}order/status`,
      {
        id: _id,
        status: true, // Send the new status in the POST request
      }
    );
    if (resetOrder.status === 200) {
      alert("Đặt lại đơn hàng thành công");
      window.location.reload();
    }
  };
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
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </ListGroupItem>
          ))}
        </ListGroup>

        <Card.Body>
          <Card.Text className="orderTotal">
            Tổng giá tiền:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(subtotal)}
          </Card.Text>
          {isStatus ? (
            <Button onClick={handleCancelOrder} className="cancelOrder">
              Hủy đơn hàng
            </Button>
          ) : (
            <Button onClick={handleResetOrder} className="cancelOrder">
              Đặt lại đơn hàng
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderItem;
