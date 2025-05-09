import React from 'react';
import Header from '../components/header';
import Product from '../components/product';
import Footer from '../components/footer';

const Productpage = () => {
  return (
    <>
      {<Header/>}  
      {<Product/>}
      {<Footer/>}
    </>
  )
}

export default Productpage;