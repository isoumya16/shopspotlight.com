import React from 'react'
import Header from '../components/header'
import SearchResult from '../components/searchresult'
import Footer from '../components/footer'

const SearchProductPage = () => {
  return (
    <>
       {<Header/>} 
       {<SearchResult/>}
       {<Footer/>}
    </>
  )
}

export default SearchProductPage