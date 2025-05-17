import React, { useState } from 'react';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import '../css/productcard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [likes, setlikes] = useState(product.product_likes || 0);
    const [hoverlikes, sethoverlikes] = useState(null);

    const handlelike = () => {
        axios.put('http://localhost:5000/products/like/' + product.product_id).then(() => {
            setlikes(likes + 1);
            alert('Product Liked!');
        })
    };

    const handleview = () => {
        axios.put('http://localhost:5000/products/view/' + product.product_id).then(() => {
            navigate('/product/' + product.product_id);
        });

        // localStorage.setItem('productdetails', JSON.stringify(productdetails));

        console.log(product);
        
    };

    const handlemouseenter = () => {
        sethoverlikes(product.product_likes);
    };

    const handlemouseleave = () => {
        sethoverlikes(null);
    };

    return (
        <div className="product-card">
            <div className="img-box">
                <img src={product.product_image} alt={product.product_name} />
                <div className="icon">
                    <li>
                        <AiOutlineShoppingCart />
                    </li>
                    <li
                        onClick={handleview}
                    >
                        <BsEye />
                    </li>
                    <li
                        onClick={handlelike}
                        onMouseEnter={handlemouseenter}
                        onMouseLeave={handlemouseleave}
                    >
                        <AiOutlineHeart />
                        {hoverlikes !== null && (
                            <span className="like-tooltip">{hoverlikes} Likes</span>
                        )}
                    </li>
                </div>
            </div>
            <div className="detail">
                <p>{product.category_name}</p>
                <h3>{product.product_name}</h3>
                <h4>₹{product.product_price}</h4>
            </div>
        </div>
    )
}

export default ProductCard;