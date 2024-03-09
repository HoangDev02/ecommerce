import React from "react";
import './navbarAdmin.css'
import SearchAdmin from "../searchAdmin/SearchAdmin";
function NavbarAdmin() {
  return (
    <div className="header">
      <SearchAdmin/>
    </div>
  );
}

export default NavbarAdmin;
