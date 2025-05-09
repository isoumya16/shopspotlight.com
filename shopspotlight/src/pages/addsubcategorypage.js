import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import AddSubcategory from '../components/addsubcategory';

const AddSubCategoryPage = () => {
    return (
        <>
            {<Header />}
            {<AddSubcategory />}
            {<Footer />}
        </>
    )
}

export default AddSubCategoryPage;