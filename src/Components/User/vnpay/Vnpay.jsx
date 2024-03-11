import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { postVnpay } from "../../../redux/API/apiVnpay";
import "./vnpay.css";
function Vnpay({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const navigate = useNavigate();

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const data = {
        orderType: "billpayment",
        language: "vn",
        bankCode: bankCode,
        amount: product.total,
        returnUrl: "http://localhost:8080/vnpay/vnpay_return",
      };

      const response = await postVnpay(data);
      window.location.href = response.data.data;
    } catch (error) {
      console.error("Error purchasing product: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <label>Chọn Phương thức thanh toán:</label>
      <div>
        <label>
          <input
            type="radio"
            name="bankCode"
            value=""
            checked={bankCode === ""}
            onChange={() => setBankCode("")}
          />
          Cổng thanh toán VNPAYQR
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="bankCode"
            value="VNPAYQR"
            checked={bankCode === "VNPAYQR"}
            onChange={() => setBankCode("VNPAYQR")}
          />
          Thanh toán qua ứng dụng hỗ trợ VNPAYQR
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="bankCode"
            value="VNBANK"
            checked={bankCode === "VNBANK"}
            onChange={() => setBankCode("VNBANK")}
          />
          Thanh toán qua ATM-Tài khoản ngân hàng nội địa
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="bankCode"
            value="INTCARD"
            checked={bankCode === "INTCARD"}
            onChange={() => setBankCode("INTCARD")}
          />
          Thanh toán qua thẻ quốc tế
        </label>
      </div>
      <button
        className="purchase-btn"
        onClick={handlePurchase}
        disabled={isLoading}
      >
        {isLoading ? "Đang xử lý..." : "Purchase"}
      </button>
    </div>
  );
}

export default Vnpay;
