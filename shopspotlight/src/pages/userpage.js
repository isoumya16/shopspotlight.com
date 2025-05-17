import React from 'react';
import User from '../components/user';
import Header from '../components/header';
import Footer from '../components/footer';

const Userpage = () => {
  return (
    <>
      {<Header />}
      {<User />}
      {<Footer />}
    </>
  )
}

export default Userpage;