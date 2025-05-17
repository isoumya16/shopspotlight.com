import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Banner from './banner';
import '../css/home.css';
import ProductCard from './productcard';
import ProductCategoryCard from './productcategorycard';
import AppDownload from './appdownload';

const Home = () => {
  const [banners, setbanners] = useState([]);
  const [topproducts, settopproducts] = useState([]);
  const [productcounts, setproductcounts] = useState([]);
  const [category, setcategory] = useState('All');

  const fetchbanners = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products/banners`).then((response) => {
      setbanners(response.data);
    })
  };

  const fetchtopproducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products/topproducts`).then((response) => {
      settopproducts(response.data);
    });
  };

  const fetchproductcounts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products/productcount`).then((response) => {
      console.log(response.data);
      
      setproductcounts(response.data);
    });
  };

  useEffect(() => {
    fetchbanners();
    fetchtopproducts();
    fetchproductcounts();
  }, []);

  return (
    <>
        <Banner banners={banners} />

      <div className="product_type">
        <div className="container">

          {productcounts.map((item, index) => (
            <ProductCategoryCard
              key={index}
              imgSrc={item.img}
              category={item.category}
              productCount={`${item.count} products`}
            />
          ))
          }
        </div>
      </div>

      <div className="product">
        <h2>Top Products</h2>
        <div className="container">

          {topproducts.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
            />
          ))
          }
        </div>
      </div>

      <AppDownload/>

    </>
  )
}

export default Home;