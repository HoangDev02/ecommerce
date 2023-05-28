import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduct, getProduct } from '../../../redux/API/apiRequestProduct';
import { addCart } from '../../../redux/API/apiRequestcart';
import { Row, CardGroup, Col, Card, Button } from 'react-bootstrap';
import { Link, useParams,useNavigate  } from 'react-router-dom';
import './productUser.scss';

const ProductUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const productDetail = useSelector((state) => state.products.detailProduct?.product);
  // const { loading, error, product } = productDetail;
  const [quantity, setQuantity] = useState(1);
  const userId = user?._id;
  const navigate = useNavigate();



  const handleAddCart = (e) => {
    e.preventDefault();
    //  addCart(user?.accessToken, dispatch, userId,id,quantity,);
     // const newProduct = {}\
    // navigate(`/cart/${userId}?quantity=${quantity}&productId=${id}`);
    const newPorduct = {
      productId: id,
      name: productDetail.name,
      price: productDetail.price,
      img: productDetail.img,
      quantity
    }
    addCart(newPorduct,dispatch,navigate,userId)
  };

  useEffect(() => {
    getProduct( dispatch, id);
  }, [id]);

  return (
    <section className="product_section layout_padding">
      <div className="container cart-product">
        <form onSubmit={handleAddCart}> 
          <div class="infor-Product">
            <h2>
              <span>{productDetail?.description}</span>
            </h2>
          </div>
          <div className="card_detail">
            <div className="card_image">
              <img src={productDetail?.img} alt="product image"/>
            </div>
            <div className="card_content text-center">
              <div className='card_description'>
                <div className='Card_name'>{productDetail?.name}</div>
                <div className='card_price'>{productDetail.price}.000</div>
                <input className='card_quantity' name="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              <div class="d-grid col-6 mx-auto btn_Buy_now">
                <button type="submit" class="btn btn-outline-danger btn_Buy_now"  >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductUser;