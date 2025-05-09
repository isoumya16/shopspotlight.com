import React from 'react';
import '../css/placeorder.css';
import { getTotalAmount } from '../store';
import { useSelector } from 'react-redux';

const PlaceOrder = () => {
    // const { gettotalcartamount } = useContext(StoreContext);
    const cartItems = useSelector((state) => state);

    return (
        <form className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder='First Name' />
                    <input type="text" placeholder='Last Name' />
                </div>
                <input type="email" placeholder='Email Address' />
                <input type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input type="text" placeholder='City' />
                    <input type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder='ZIP Code' />
                    <input type="text" placeholder='Country' />
                </div>
                <input type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
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
                            <p>₹{getTotalAmount(cartItems) === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>₹{getTotalAmount(cartItems) === 0 ? 0 : getTotalAmount(cartItems) + 2}</b>
                        </div>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder;