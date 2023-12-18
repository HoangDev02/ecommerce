import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PayButton = ({ cartItems, subtotal, total }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const handleCheckout = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}payment/`, {
        cartItems,
        userId: user._id,
        subtotal: subtotal,
        total: total
      })
      .then((res) => {
        if (res.data.url) {
          console.log(res.data.url);
        }
      })  
      .catch((err) => {
        console.log(err);
        toast.error('An error occurred. Please try again later.');
      });
  };

  return (
    <>
      <button onClick={handleCheckout}>checkout</button>
      <ToastContainer />
    </>
  );
};

export default PayButton;
