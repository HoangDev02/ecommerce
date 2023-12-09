import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductAll } from "../../../redux/API/apiRequestProduct";
import ReactPaginate from "react-paginate";
import "./product.css";

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
  const handlePriceChange = (e) => {
    setSortByPrice(e.target.value);
    setCurrentPage(0);
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
    <div className="Container">
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
                  <select value={sortByPrice} onChange={handlePriceChange}>
                    <option value="">Sort by Price</option>
                    <option value="lowToHigh">Giá cao đến thấp</option>
                    <option value="highToLow">Giá thấp đến cao</option>
                  </select>
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
              <div className="col-sm-6 col-md-4 col-lg-4" key={item._id}>
                <div className="box">
                  <Col>
                    <Card>
                      <div className="option_container">
                        <div className="options">
                          <Link
                            to={`/product/${item.slug}`}
                            className="option1"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                      <div className="img-box">
                        {item?.img.length > 0 && (
                          <Card.Img
                            variant="top"
                            src={`${process.env.REACT_APP_BACKEND_URL}${item.img[0]}`}
                            alt="image"
                          />
                        )}
                      </div>
                      <Card.Body className="detail-box">
                        <Card.Title>
                          {" "}
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Card.Title>
                        <Card.Title>${item.price}</Card.Title>
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
  );
};

export default FilterableProductTable;
