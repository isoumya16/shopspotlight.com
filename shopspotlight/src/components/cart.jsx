import React from 'react';
import '../css/cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getTotalAmount } from '../store';

const Cart = () => {
  const cartItems = useSelector((state) => state || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems.length === 0 ? (
          <p className='empty-cart'>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.product_id}>
              <div className='cart-items-title cart-items-item'>
                <img src={item.product_image} alt={item.title} />
                <p>{item.product_name}</p>
                <p>₹{item.product_price}</p>
                <p>{item.quantity}</p>
                <p>₹{item.product_price * item.quantity}</p>
                <p onClick={() => handleRemove(item.product_id)} className='cross'>
                  <AiOutlineDelete />
                </p>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>

      <div className='cart-bottom'>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalAmount(cartItems)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{cartItems.length === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{cartItems.length === 0 ? 0 : getTotalAmount(cartItems) + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
