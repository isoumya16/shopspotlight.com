import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import PlaceOrder from '../components/placeorder';


const Placeorderpage = () => {
  return (
    <>
      {<Header/>}  
      {<PlaceOrder/>}
      {<Footer/>}
    </>
  )
}

export default Placeorderpage;