import React from 'react';
import Header from '../components/header';
import Contact from '../components/contact';
import Footer from '../components/footer';

const Contactpage = () => {
    return (
        <>
            {<Header />}
            {<Contact />}
            {<Footer/>}
        </>
    )
}

export default Contactpage;