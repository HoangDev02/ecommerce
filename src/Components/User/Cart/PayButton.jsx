import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Vnpay from "../vnpay/Vnpay";

const PayButton = ({ cartItems, subtotal, total }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    city: "",
    district: "",
    ward: "",
    streetname: "",
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [vnpay, setVnpay] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100"
      )
      .then((response) => setProvinces(response.data.results))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);
  useEffect(() => {
    if (address.city) {
      const province = provinces.find(
        (province) => province.name === address.city
      );
      if (province) {
        axios
          .get(
            `https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${province.id}&basic=true&limit=100`
          )
          .then((response) => setDistricts(response.data.results))
          .catch((error) => console.error("Error fetching districts:", error));
      }
    }
  }, [address.city, provinces]);
  useEffect(() => {
    if (address.district) {
      const district = districts.find(
        (district) => district.name === address.district
      );
      if (district) {
        axios
          .get(
            `https://vnprovinces.pythonanywhere.com/api/wards/?district_id=${district.id}&basic=true&limit=100`
          )
          .then((response) => setWards(response.data.results))
          .catch((error) => console.error("Error fetching wards:", error));
      }
    }
  }, [address.district, districts]);
  const handleCheckout = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}payment`, {
        cartItems,
        userId: user._id,
        subtotal: subtotal,
        total: total,
        address: address,
        name: name,
        phone: phone,
        status: true,
        paymentMethod: paymentMethod,
      })
      .then((res) => {
        if (res.data.url) {
          console.log(res.data.url);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again later.");
      });
    if (paymentMethod === "card") {
      // Logic for bank payment
      <Vnpay />;
    } else if (paymentMethod === "cash") {
      // Logic for cash payment
      alert("Đặt hàng thành công");
    }
  };

  return (
    <>
      <div className="">
        <div className="row justify-content-center">
          <div className="">
            <div className="card ">
              <div className="card-body">
                <div className="mb-3">
                  {" "}
                  <h2>Thông tin người đặt hàng:</h2>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Tên:
                  </label>
                  <input
                    type="text"
                    className="form-control-order"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại:
                  </label>
                  <input
                    type="text"
                    className="form-control-order"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3" style={{ width: "100%" }}>
                  <label htmlFor="city" className="form-label">
                    Tỉnh:
                  </label>
                  <select
                    className="form-control-order"
                    id="city"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  >
                    {provinces.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3" style={{ width: "100%" }}>
                  <label htmlFor="district" className="form-label">
                    Quận/Huyện:
                  </label>
                  <select
                    className="form-control-order"
                    id="district"
                    value={address.district}
                    onChange={(e) =>
                      setAddress({ ...address, district: e.target.value })
                    }
                  >
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3" style={{ width: "100%" }}>
                  <label htmlFor="ward" className="form-label">
                    Phường/Xã:
                  </label>
                  <select
                    className="form-control-order"
                    id="ward"
                    value={address.ward}
                    onChange={(e) =>
                      setAddress({ ...address, ward: e.target.value })
                    }
                  >
                    {wards.map((ward) => (
                      <option key={ward.id} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="streetname" className="form-label">
                    Số nhà/ Tên đường:
                  </label>
                  <input
                    type="text"
                    className="form-control-order"
                    id="streetname"
                    value={address.streetname}
                    onChange={(e) =>
                      setAddress({ ...address, streetname: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">
                    Thanh toán:
                  </label>
                  <select
                    className="form-select"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setVnpay(e.target.value);
                    }}
                  >
                    <option value="">chọn phương thức thanh toán</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="card">Ngân Hàng</option>
                  </select>
                </div>
                {vnpay === "cash" ? (
                  <button onClick={handleCheckout} className="order-now">
                    Đặt hàng Ngay
                  </button>
                ) : vnpay === "card" ? (
                  <Vnpay product={cartItems} name={name} address={address} phone={phone}/>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PayButton;
