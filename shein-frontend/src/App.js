import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
//user
import Home from "./pages/user/home/Home";
import ProductUser from './Components/User/ProductDetail/ProductUser'
import CartUser from './Components/User/Cart/CartUser'
import User from "./Components/Admin/user/User";
import FilterableProductTable from "./Components/User/FilterableProductTable/FilterableProductTable"
//admin
import HomeAdmin from "./Components/Admin/Home/Home" 
import Product from "./Components/Admin/product/Product";
import UpdateProduct from "./Components/Admin/product/UpdateProduct";

function App() {

  return (
    <Router>
    <NavBar />
    <div className="App"> 
      <Routes>
        {/* admin */}
        <Route path="/admin" element={<HomeAdmin/>}/>
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/product" element={<Product/>}/>
        <Route path="/product/edit/:id?" element ={<UpdateProduct/>}/>
        {/* User */}
        <Route path="/" element={<Home/>}></Route>
        <Route path="/product/:id" element= {<ProductUser/>}></Route>
        <Route path="/product" element={<FilterableProductTable/>}></Route>
        <Route path="/cart/:userId?" element= {<CartUser/>}></Route>
        {/* Compoment */}
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    <Footer/>
  </Router>
  );
}
export default App;
