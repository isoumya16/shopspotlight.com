import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Cart from '../components/cart';

const Cartpage = () => {
    return (
        <>
            {<Header />}
            {<Cart/>}
            {<Footer/>}
        </>
    )
}

export default Cartpage;