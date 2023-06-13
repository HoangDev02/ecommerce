import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduct, getProduct } from '../../../redux/API/apiRequestProduct';
import { addCart } from '../../../redux/API/apiRequestcart';

import { Link, useParams, useNavigate } from 'react-router-dom';
import './productUser.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const productDetail = useSelector((state) => state.products.detailProduct?.product);
  const [quantity, setQuantity] = useState(1);
  const userId = user?._id;
  const navigate = useNavigate();
  const handleAddCart = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const newProduct = {
      productId: productDetail._id,
      name: productDetail.name,
      price: productDetail.price,
      img: productDetail.img,
      quantity
    };
    addCart(newProduct, dispatch, navigate, userId);
    // Show toast notification
    toast.success('Sản phẩm đã được thêm vào giỏ hàng', { autoClose: 3000 });
  };

  useEffect(() => {
    getProduct(dispatch, id);
  }, [id]);

  return (
    <section className="product_section layout_padding">
      <div className="container cart-product">
        <form onSubmit={handleAddCart}> 
          <div className="card_detail">
            <div className="card_image">
              <img src={productDetail?.img} alt="product image"/>
            </div>
            <div className="card_content text-center">
              <div className='card_description'>
                <div className='Card_name'>{productDetail?.name}</div>
                <div className='card_id'>SKU: {productDetail?._id}</div>
                <div className='card_price'>{productDetail?.price}.000 VNĐ</div>
                <div>
                <p className='card_price'>Số lượng: <input className='card_quantity' name="quantity" type="number" value={quantity} onChange={(e) => {
                    if (e.target.value >= 1) {
                      setQuantity(e.target.value);
                    }
                  }} /></p>
                </div>
              </div>
              <div className="d-grid col-6 mx-auto btn_Buy_now">
                <button type="submit" className="btn btn-outline-danger btn_Buy_now">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default ProductUser;
