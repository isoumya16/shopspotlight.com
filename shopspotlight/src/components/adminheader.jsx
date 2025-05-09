import React from 'react';
import '../css/header.css';
import { useNavigate } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <div id="navbar-parent-2">
                <div id="logo">
                    <FaShopify /> ShopSpotlight Admin
                </div>
            </div>

            <div id="navbar-parent-3">
                <ul className="nav-links">
                    <input type="checkbox" id="checkbox-toggle" />
                    <label htmlFor="checkbox-toggle" className="hamburger">&#9776;</label>
                    <div className="menu">
                        <li><a onClick={() => navigate('/admin/dashboard')}>Dashboard</a></li>
                        <li><a onClick={() => navigate('/admin/userlist')}>User List</a></li>
                        <li><a onClick={() => navigate('/admin/productlist')}>Product List</a></li>
                        <li><a onClick={() => navigate('/admin/addproduct')}>Add Product</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default AdminHeader;
