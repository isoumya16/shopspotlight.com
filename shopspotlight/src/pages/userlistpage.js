import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Userlist from '../components/userlist';

const Userlistpage = () => {
  return (
    <>
      {<Header/>}  
      {<Userlist/>}
      {<Footer/>}
    </>
  )
}

export default Userlistpage;