import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCart,
  getCart,
  updateCartQuantity,
} from "../../../redux/API/apiRequestcart";
import { useParams, useNavigate, Link } from "react-router-dom";
import PayButton from "./PayButton";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cartUser.scss";
import Vnpay from "../vnpay/Vnpay";
import { set } from "js-cookie";
import { createAxios } from "../../../redux/createInstance";
import { loginSuccess } from "../../../redux/authSlice";

const CartUser = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(userId);

  const user = useSelector((state) => state.auth.login.currentUser);
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const carts = useSelector((state) => state.carts.cartItems?.allCart);
  const accessToken = user?.accessToken;

  const handleDeleteCart = (productId) => {
    console.log("productId", productId);
    deleteCart(productId, dispatch, axiosJWT, accessToken).then(() => {
      getCart(accessToken, dispatch, axiosJWT);
      toast.success("Sản phẩm đã được xóa khỏi giỏ hàng", { autoClose: 3000 });
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleDeleteCart(productId); // Xóa sản phẩm nếu quantity xuống 0
    } else {
      updateCartQuantity(
        axiosJWT,
        productId,
        newQuantity,
        dispatch,
        accessToken
      )
        .then(() => {
          getCart(accessToken, dispatch, userId);
        })
        .catch((error) => {
          // Handle the error here, such as displaying an error message
          console.log(error);
        });
    }
  };

  useEffect(() => {

    if (currentUserId !== userId && user?.accessToken) {
      getCart(accessToken, dispatch, axiosJWT);
      setCurrentUserId(userId);
    }
  }, [currentUserId, dispatch, user]);

  const calculateSubtotal = (products) => {
    let subtotal = 0;
    if (products) {
      for (const product of products) {
        subtotal += product.price * product.quantity;
      }
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(subtotal);
  };
  return (
    <Container>
      {carts?.products?.length > 0 ? (
        <div className="cart-wrapper">
          <div className="cart-container">
            <h2 className="cart-title">Giỏ hàng</h2>
            <div className="cart-product-list">
              <Row>
                <Col md={5}>
                  {carts.products.map((product, index) => (
                    <div className="cart-product" key={product.productId}>
                      <div className="cart-product-image">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}${product.img}`}
                          alt={product.name}
                        />
                      </div>
                      <div className="cart-product-details">
                        <h3 className="cart-product-name">{product.name}</h3>
                        <div className="cart-product-quantity">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                product.productId,
                                product.quantity - 1
                              )
                            }
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                product.productId,
                                product.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-product-price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </div>
                        <button
                          className="cart-product-delete"
                          onClick={() => handleDeleteCart(product.productId)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="cart-total">
                    <span className="cart-total-label">Tổng tiền:</span>
                    <span className="cart-total-amount">
                      ${calculateSubtotal(carts.products)}
                    </span>
                  </div>
                </Col>
                <Col md={7} lg={7} xl={7}>
                  <div>
                    {/* <Link to={"/cart/cart-info-order-box"}>Đặt hàng Ngay</Link> */}
                    <PayButton
                      cartItems={carts}
                      subtotal={carts.subtotal}
                      total={carts.products.total}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <ToastContainer />
          </div>
        </div>
      ) : (
        <div className="empty-cart-message">
          Không có sản phẩm nào trong giỏ hàng
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default CartUser;
