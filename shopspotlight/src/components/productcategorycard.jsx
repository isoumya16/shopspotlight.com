import React from 'react';
import '../css/productcategorycard.css';

const ProductCategoryCard = ({ imgSrc, category, productCount }) => {
    return (
        <div className="product-category-card">
            <div className="img-box">
                <img src={imgSrc} alt={category} />
            </div>
            <div className="detail">
                <h3>{category}</h3>
                <p>{productCount}</p>
            </div>
        </div>
    )
}

export default ProductCategoryCard;