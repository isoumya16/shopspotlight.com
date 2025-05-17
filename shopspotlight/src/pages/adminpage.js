import React from 'react';
import Admin from '../components/admin';
import Header from '../components/header';
import Footer from '../components/footer';

const Adminpage = () => {
  return (
    <>
      {<Header />}
      {<Admin />}
      {<Footer />}
    </>
  )
}

export default Adminpage;