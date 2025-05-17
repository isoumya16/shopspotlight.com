import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/productdetails';
import Header from '../components/header';
import Footer from '../components/footer';

const Productdetailspage = () => {
  const { id } = useParams();

  return (
    <>
      {<Header/>}
      {<ProductDetails productId={id} />}
      {<Footer/>}
    </>
  );
};

export default Productdetailspage;
