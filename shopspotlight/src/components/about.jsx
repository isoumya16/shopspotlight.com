import React from 'react';
import '../css/about.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image">
          {/* Replace with your actual image path */}
          <img src="/images/about-us.jpg" alt="About ShopSpotlight" /> 
        </div>
        <div className="about-content">
          <h2>About ShopSpotlight</h2>
          <p>
            Welcome to ShopSpotlight, your one-stop destination for discovering the latest trends and must-have products. We're passionate about curating a diverse selection of high-quality items, from fashion and electronics to home goods and more. Our mission is to make your shopping experience enjoyable, convenient, and inspiring.
          </p>
          <p>
            At ShopSpotlight, we believe in offering exceptional value and customer service.  We carefully select our products, partnering with trusted brands and suppliers to ensure top-notch quality.  Our team is dedicated to providing you with a seamless shopping experience, from browsing our curated collections to receiving your purchases.
          </p>
          <p>
            We're more than just an online store; we're a community of style-conscious individuals who appreciate quality and value.  Follow us on social media to stay up-to-date on the latest arrivals, exclusive deals, and style inspiration.  We're excited to have you join the ShopSpotlight family!
          </p>
        </div>
      </div>
    </section>
  )
}

export default About;