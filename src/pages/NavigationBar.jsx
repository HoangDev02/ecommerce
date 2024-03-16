import { useLocation } from 'react-router-dom';
import NavbarAdmin from '../Components/Admin/navbarAdmin/NavbarAdmin';
import NavBar from '../Components/NavBar/NavBar';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    if(user && (location.pathname === '/login' || location.pathname === '/register')){
      navigate("/")
    } 
  }, [user, navigate, location]);
  if (location.pathname.startsWith('/admin')) {
    return <NavbarAdmin />;
  } else {
    return <NavBar />;
  }

}
export default NavigationBar