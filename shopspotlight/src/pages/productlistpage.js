import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Productlist from '../components/productlist';

const Productlistpage = () => {
  return (
    <>
      {<Header/>}  
      {<Productlist/>}
      {<Footer/>}
    </>
  )
}

export default Productlistpage;