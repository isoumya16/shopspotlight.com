import React, { useContext } from 'react';
import '../css/header.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBagCheck } from 'react-icons/bs';
import { FaShopify } from 'react-icons/fa';
import { StoreContext } from '../context/StoreContext';

const UserHeader = () => {
    const navigate = useNavigate();
    const { gettotalcartamount } = useContext(StoreContext);
    
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <div id="navbar-parent-2">
                <div id="logo">
                    <FaShopify /> ShopSpotlight.com
                </div>

                <ul className="nav-links">
                    <div className="menu">
                        <div className="second_icon">
                            <li><a onClick={() => navigate('/wishlist')}><AiOutlineHeart /></a></li>
                            <div className="cart-bag">
                                <li><a onClick={() => navigate('/cart')}><BsBagCheck /></a></li>
                                <div className={gettotalcartamount() === 0 ? "" : "dot"}></div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>

            <div id="navbar-parent-3">
                <ul className="nav-links">
                    <input type="checkbox" id="checkbox-toggle" />
                    <label htmlFor="checkbox-toggle" className="hamburger">&#9776;</label>
                    <div className="menu">
                        <li><a onClick={() => navigate('/')}>Home</a></li>
                        <li><a onClick={() => navigate('/products')}>Products</a></li>
                        <li><a onClick={() => navigate('/profile')}>Profile</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default UserHeader;
