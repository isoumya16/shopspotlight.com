import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import SecurePayments from '../components/securepayments';

const Securepaymentspage = () => {
  return (
    <>
      {<Header/>}  
      {<SecurePayments/>}
      {<Footer/>}
    </>
  )
}

export default Securepaymentspage;