import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import { createAxios } from "../../../redux/createInstance";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../../redux/API/apiOrder";
import { logoutSuccess } from "../../../redux/authSlice";

function Order() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const order = useSelector((state) => state.orders.order?.order);
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  useEffect(() => {
    if(user === null){
      window.location.href = '/login'
    
    }
    getOrder(user?.accessToken, axiosJWT, dispatch);
  }, []);

  return (
    <div className="orders">
      <div className="order-items">
        {order.length === 0 ? (
          <h1>Không có đơn hàng nào</h1>
        ) : (
          order.map((singleOrder) => (
            <OrderItem key={singleOrder._id} order={singleOrder} />
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
