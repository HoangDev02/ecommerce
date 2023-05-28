import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart, getCart, updateCartQuantity } from '../../../redux/API/apiRequestcart';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cartUser.scss';

const CartUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login.currentUser);
  const carts = useSelector((state) => state.carts.cartItems?.allCart);
  const accessToken = user?.accessToken;
  const msg = useSelector((state) => state.carts?.msg);

  const handleDeleteCart = (productId) => {
    deleteCart(productId, dispatch, userId)
      .then(() => {
        getCart(accessToken, dispatch, userId);
      });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateCartQuantity(userId, productId, newQuantity, dispatch)
      .then(() => {
        getCart(accessToken, dispatch, userId);
      })
      .catch((error) => {
        // Handle the error here, such as displaying an error message
        console.log(error);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (!carts) {
      navigate('/');
    }
    if (user?.accessToken) {
      getCart(accessToken, dispatch, userId);
    }
  }, [userId]);

  const calculateSubtotal = (products) => {
    let subtotal = 0;
    if (products) {
      for (const product of products) {
        subtotal += product.price * product.quantity;
      }
    }
    return subtotal;
  };

  return (
    <div>
      {
       <div className="cart-wrapper">
       <div className="cart-container">
         <h2 className="cart-title">Giỏ hàng</h2>
         <div className="cart-product-list">
           {carts?.products && carts.products.map((product) => (
             <div className="cart-product" key={product.productId}>
               <div className="cart-product-image">
                 <img src={product.img} alt={product.name} />
               </div>
               <div className="cart-product-details">
                 <h3 className="cart-product-name">{product.name}</h3>
                 <div className="cart-product-quantity">
                   <button onClick={() => handleUpdateQuantity(product.productId, product.quantity - 1)}>-</button>
                   <span>{product.quantity}</span>
                   <button onClick={() => handleUpdateQuantity(product.productId, product.quantity + 1)}>+</button>
                 </div>
                 <div className="cart-product-price">${product.price}</div>
                 <button className="cart-product-delete" onClick={() => handleDeleteCart(product.productId)}>
                   Xóa
                 </button>
               </div>
             </div>
           ))}
         </div>
         <div className="cart-total">
           <span className="cart-total-label">Tổng tiền:</span>
           <span className="cart-total-amount">${calculateSubtotal(carts?.products)}</span>
         </div>
         <button className="cart-checkout-button">Thanh toán</button>
       </div>
     </div>
      }
    </div>
  );
};

export default CartUser;
