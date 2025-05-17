import React from 'react';
import Categorylist from '../components/categorylist';
import Header from '../components/header';
import Footer from '../components/footer';

const Categorylistpage = () => {
    return (
        <>
            {<Header />}
            {<Categorylist />}
            {<Footer />}
        </>
    )
}

export default Categorylistpage;