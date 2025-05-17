import React, { useState } from 'react';

import '../css/header.css';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';

import { BsBagCheck } from 'react-icons/bs';

import { FaSearch, FaShopify } from 'react-icons/fa';

import { MdOutlineLogout } from "react-icons/md";

import { getTotalAmount } from '../store';

import { useSelector } from 'react-redux';

const Header = () => {

    const navigate = useNavigate();

    // const { gettotalcartamount } = useContext(StoreContext);

    const location = useLocation();

    const email = localStorage.getItem('email');

    // const firstname = localStorage.getItem('firstname');

    const profilepic = localStorage.getItem('profilepic');

    const userrole = localStorage.getItem('userrole');

    const cartItems = useSelector(state => state);

    const showSearchBox = location.pathname !== '/about' && location.pathname !== '/contact';

    const [searchTerm, setSearchTerm] = useState('');

    const handlelogout = () => {

        localStorage.clear();

        navigate('/login');

    };

      const handleSearch = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        if (!searchTerm.trim()) {
          // Optionally provide feedback for an empty search term
          console.log("Search term cannot be empty.");
          return;
        }
    
        try {
          // Simulate an API call to fetch product data based on the search term
          const response = await fetch(`http://localhost:5000/products/searchproduct?query=${encodeURIComponent(searchTerm)}`);
          const data = await response.json();
    
          if (response.ok && data.length > 0) {
            // Assuming the API returns an array of matching products,
            // we navigate to the details page of the first product found.
            // In a real-world scenario, you might want to display a search results page
            // if multiple products match.
            navigate('/product/' + data[0].product_id);
          } else {
            // No matching product found
            alert('No product exists matching your search criteria.');
            // Optionally update state to display the message in the UI instead of an alert
            // setNoProductFound(true);
          }
        } catch (error) {
          console.error('Error during search:', error);
          alert('An error occurred during the search. Please try again later.');
          // Optionally handle the error state in the UI
        } finally {
          // Optionally clear the search term after submission
          setSearchTerm('');
        }
      };

    return (

        <>

            {/* Main Navbar */}

            <div id="navbar-parent-2">

                <div id="logo">

                    <FaShopify /> ShopSpotlight.com

                </div>

                {/* Search Box */}

                {showSearchBox && (

                    <div className="search_box">

                        <input

                            type="text"

                            placeholder="Search Your Product..."

                            autoComplete="off"

                            value={searchTerm}

                            onChange={(event) => setSearchTerm(event.target.value)}

                            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}

                        />

                        <button onClick={handleSearch}><FaSearch fontSize={16} /></button>

                    </div>

                )}

                {/* Wishlist & Cart Icons */}

                <ul className="nav-links">

                    <div className="menu">

                        <div className="second_icon">

                            {userrole === 'User' && <>
                                <li><a onClick={() => navigate('/')}><AiOutlineHeart /></a></li>
                                <div className="cart-bag">
                                    <li><a onClick={() => navigate('/cart')}><BsBagCheck /></a></li>
                                    <div className={getTotalAmount(cartItems) === 0 ? "" : "dot"}></div>
                                </div>
                            </>
                            }

                            <li><a onClick={handlelogout}> <MdOutlineLogout /></a></li>

                        </div>

                    </div>

                </ul>

            </div>

            {/* Navigation Links */}

            <div id="navbar-parent-3">

                <ul className="nav-links">

                    <input type="checkbox" id="checkbox-toggle" />

                    <label htmlFor="checkbox-toggle" className="hamburger">&#9776;</label>

                    <div className="menu">

                        {/* When user is not logged in */}

                        {email === null && (

                            <>

                                <li><a onClick={() => navigate('/registration')}>Registration</a></li>

                                <li><a onClick={() => navigate('/login')}>Login</a></li>

                            </>

                        )}



                        {/* When user is logged in */}

                        {email !== null && (

                            <>

                                <li><a onClick={() => navigate('/')}>Home</a></li>

                                <li><a onClick={() => navigate('/products')}>Products</a></li>

                                <li className="services">

                                    <a>Services</a>

                                    <ul className="dropdown">

                                        <li><a onClick={() => navigate('/delivery')}>Fast Delivery</a></li>

                                        <li><a onClick={() => navigate('/support')}>Support</a></li>

                                        <li><a onClick={() => navigate('/securepayments')}>Secure Payments</a></li>

                                        <li><a onClick={() => navigate('/returns')}>Easy Returns</a></li>
                                    </ul>

                                </li>

                                <li><a onClick={() => navigate('/about')}>About Us</a></li>

                                <li><a onClick={() => navigate('/contact')}>Contact</a></li>


                                {/* Supplier & Admin Features */}

                                {(userrole === "Supplier" || userrole === "Admin") && (

                                    <>

                                        <li><a onClick={() => navigate('/admin/productlist')}>Product List</a></li>

                                        <li><a onClick={() => navigate('/admin/addproduct')}>Add Product</a></li>

                                    </>

                                )}



                                {/* Admin Exclusive Feature */}

                                {userrole === "Admin" && (

                                    <li><a onClick={() => navigate('/admin/userlist')}>User List</a></li>

                                )}

                            </>



                        )}

                    </div>

                    <img src={profilepic} className="profile" onClick={() => navigate('/profile')} alt="" />

                </ul>

            </div>

        </>

    );

};



export default Header;