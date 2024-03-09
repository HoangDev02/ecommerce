import React from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./category.css";
const Category = () => {
  return (
    <div className="container-fluid container-category">
      <div className="container  ">
        <Row >
          <div className="list-submenu text-center">
            <Link href="/" className="list-submenu-text">
              Săn Voucher GEARVN
            </Link>
            <Link href="/product" className="list-submenu-text">
              Tin công nghệ
            </Link>
            <Link href="#pricing" className="list-submenu-text">
              Video
            </Link>
            <Link href="#pricing" className="list-submenu-text">
              Hướng dẫn thanh toán
            </Link>
            <Link href="#pricing" className="list-submenu-text">
              Hướng dẫn trả góp
            </Link>
            <Link href="#pricing" className="list-submenu-text">
              Chính sách bảo hành
            </Link>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Category;
