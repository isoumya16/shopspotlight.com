import React, { useEffect, useState } from 'react';
import ProductCard from './productcard';
import axios from 'axios';
import '../css/product.css';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [productsdata, setproductsdata] = useState([]);
  const [filtereddata, setfiltereddata] = useState([]);
  const navigate = useNavigate();

  const getproductlist = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products/productlist/`).then((response) => {
      console.log(response.data.message);

      setproductsdata(response.data.message);
      setfiltereddata(response.data.message);

      localStorage.setItem('product_id',response.data.message[0].product_id);

    });
  };

  const handleproductdelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/products/deleteproduct/${id}`).then(() => {
      getproductlist();
    });
  };

  const handleproductedit = (id) => {
    navigate('/editproduct/' + id);
  };

  const filterproduct = (category) => {
    if (category === 'All Products') {
      setfiltereddata(productsdata);
    } else {
      const filtered = productsdata.filter(
        (product) => product.category_name === category
      );
      setfiltereddata(filtered);
    }
  };

  useEffect(() => {
    getproductlist();
  }, []);

  return (
    <>
      <div className="products">
        <h2># Products</h2>
        <div className="container">
          <div className="filter">
            <div className="categories">
              <h3>Categories</h3>
              <ul>
                <li onClick={() => filterproduct('All Products')}>All Products</li>
                <li onClick={() => filterproduct('Air Conditioner')}>Air Conditioner</li>
                <li onClick={() => filterproduct('Washing Machine')}>Washing Machine</li>
                <li onClick={() => filterproduct('Smart TV')}>Smart TV</li>
                <li onClick={() => filterproduct('Refrigerator')}>Refrigerator</li>
                <li onClick={() => filterproduct('Mobile Phone')}>Mobile Phone</li>
                <li onClick={() => filterproduct('Laptop')}>Laptop</li>
                <li onClick={() => filterproduct('Headphones')}>Headphones</li>
                <li onClick={() => filterproduct('Smart Watch')}>Smart Watch</li>
              </ul>
            </div>
          </div>

          <div className="products_container">
            {filtereddata.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                handleproductdelete={handleproductdelete}
                handleproductedit={handleproductedit}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
