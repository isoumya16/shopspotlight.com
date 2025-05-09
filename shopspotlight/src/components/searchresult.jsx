import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './productcard';

const SearchResult = () => {
    const location = useLocation();
    const { products, message } = location.state || {};

    return (
        <div className="search-result">
            {message && <p>{message}</p>}
            {products && products.length > 0 && (
                <div className="products_container">
                    {products.map((product) => (
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </div>
            )}
            {!message && (!products || products.length === 0) && (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default SearchResult;