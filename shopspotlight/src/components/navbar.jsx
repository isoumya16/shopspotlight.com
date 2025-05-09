import React, { useContext, useState } from 'react';
import '../css/navbar.css';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = () => {
    const [menu, setmenu] = useState('home');
    const { gettotalcartamount } = useContext(StoreContext);

    return (
        <div className='navbar'>
            <Link to='/'><h1 className='logo'>ShopSpotlight.com</h1></Link>
            <ul className="navbar-menu">
                <li onClick={() => setmenu('home')} className={menu === 'home' ? 'active' : ''}>home</li>
                <li onClick={() => setmenu('products')} className={menu === 'products' ? 'active' : ''}>products</li>
                <li onClick={() => setmenu('services')} className={menu === 'services' ? 'active' : ''}>services</li>
                <li onClick={() => setmenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile-app</li>
                <li onClick={() => setmenu('about-us')} className={menu === 'about-us' ? 'active' : ''}>about-us</li>
                <li onClick={() => setmenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact-us</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={gettotalcartamount() === 0 ? "" : "dot"}></div>
                </div>
                <button>sign in</button>
                <img className='profile' src={assets.profile_icon} alt="" />
            </div>
        </div>
    )
}

export default Navbar;