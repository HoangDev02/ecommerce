import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductAll } from "../../../redux/API/apiRequestProduct";
import ReactPaginate from "react-paginate";

const FilterableProductTable = () => {
  const productList = useSelector(
    (state) => state.products.products?.allProduct
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9;
  const [category, setCategory] = useState(""); // Lựa chọn phân loại theo category
  const [sortByPrice, setSortByPrice] = useState(""); // Lựa chọn phân loại theo giá
  const [sortOrder, setSortOrder] = useState(""); // Lựa chọn thứ tự sắp xếp

  useEffect(() => {
    getProductAll(dispatch);
  }, [dispatch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(0);
  };

  const filteredProducts = productList?.filter((product) => {
    if (category && product.category !== category) {
      return false;
    }
    return true;
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sortByPrice === "lowToHigh") {
      return a.price - b.price;
    } else if (sortByPrice === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });

  const orderedProducts =
    sortOrder === "asc" ? sortedProducts : sortedProducts?.reverse();
  const offset = currentPage * productsPerPage;
  const currentProducts = orderedProducts?.slice(
    offset,
    offset + productsPerPage
  );
  const pageCount = Math.ceil(orderedProducts?.length / productsPerPage);
  return (
    <div className="container-fluid backrgound">
      <div className="container">
        <section className="product_section layout_padding">
          <div className="container">
            <div className="heading_container heading_center">
              <div className="row">
                <div className="col-4">
                  <h2>
                    <span> Products</span>
                  </h2>
                </div>
                <div className="col-8 text-end">
                  <div className="filter-section">
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                      <option value="">Sort Order</option>
                      <option value="asc">Tăng dần</option>
                      <option value="desc">Giảm dần</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {currentProducts?.map((item) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={item._id}>
                  <div className="box">
                    <Col>
                      <Card className="card-product">
                        <div className="img-box">
                          {item?.img.length > 0 && (
                            <Card.Img
                              variant="top"
                              src={`${process.env.REACT_APP_BACKEND_URL}${item.img[0]}`}
                              alt="image"
                              className="card-img-product"
                            />
                          )}
                        </div>
                        <Card.Body className="detail-box">
                          <Card.Title>
                            {" "}
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </Card.Title>
                          <Card.Title>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-container">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FilterableProductTable;
