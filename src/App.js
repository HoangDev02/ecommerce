import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
//user
import Home from "./pages/user/home/Home";
import ProductUser from "./Components/User/ProductDetail/ProductUser";
import CartUser from "./Components/User/Cart/CartUser";
import CategoryUser from "./Components/User/category/Category";
import User from "./Components/Admin/user/User";
import FilterableProductTable from "./Components/User/FilterableProductTable/FilterableProductTable";
import Success from "./Components/User/Cart/Success";
import Search from "./Components/User/search/Search";
//admin
import HomeAdmin from "./Components/Admin/Home/Home";
import Product from "./Components/Admin/product/Product";
import UpdateProduct from "./Components/Admin/product/UpdateProduct";
import NavigationBar from "./pages/NavigationBar";
import RouterAdmin from "./pages/RouterAdmin";
import ConnectionPage from "./pages/ConnectionPage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import PayButton from "./Components/User/Cart/PayButton";
import Order from "./Components/User/order/Order";
import Profile from "./Components/User/Profile/Profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const [status, setStatus] = useState("Đang kết nối...");
  const [isConnected, setIsConnected] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}health-check`);
        setStatus("Kết nối thành công!");
        setIsConnected(true);
      } catch (error) {
        setStatus("Không thể kết nối đến server.");
        setIsConnected(false);
      }
    };
    fetchData();
  }, [isConnected]);
  if (!isConnected) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col>
            <div className="text-center">
              <h1>Không thể kết nối đến server</h1>
              <p>Vui lòng kiểm tra lại kết nối của bạn và thử lại.</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Router>
      <NavigationBar />
      <div className="App">
        <Routes>
          {/* admin */}
          <Route
            path="/admin"
            element={
              <RouterAdmin>
                <HomeAdmin />
              </RouterAdmin>
            }
          />
          <Route path="/error" element={<ConnectionPage></ConnectionPage>} />
          <Route
            path="/admin/user"
            element={
              <RouterAdmin>
                <User />
              </RouterAdmin>
            }
          />
          <Route
            path="/admin/product"
            element={
              <RouterAdmin>
                <Product />
              </RouterAdmin>
            }
          />
          <Route
            path="/product/edit/:id?"
            element={
              <RouterAdmin>
                <UpdateProduct />
              </RouterAdmin>
            }
          />
          {/* User */}

          <Route path="/" element={<Home />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/product/:id" element={<ProductUser />}></Route>
          <Route path="/product" element={<FilterableProductTable />}></Route>
          <Route path="/cart/:userId?" element={<CartUser />}></Route>
          <Route path="/category/:slug" element={<CategoryUser />}></Route>
          <Route path="/search?" element={<Search />}></Route>
          <Route
            path="/cart/cart-info-order-box"
            element={<PayButton />}
          ></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          {/* Compoment */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;
