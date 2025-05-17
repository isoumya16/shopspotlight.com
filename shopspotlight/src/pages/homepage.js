import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Home from '../components/home';

const Homepage = () => {
  return (
    <>
      {<Header/>}  
      {<Home/>}
      {<Footer/>}
    </>
  )
}

export default Homepage;