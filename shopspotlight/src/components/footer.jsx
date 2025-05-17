// import React from 'react';
// import { RiFacebookFill } from 'react-icons/ri';
// import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
// import { BsYoutube } from 'react-icons/bs';
// import '../css/footer.css';

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <div className="footer-container">
//                 <div className="footer-section">
//                     <h3>Get to Know Us</h3>
//                     <ul>
//                         <li>About ShopSpotlight</li>
//                         <li>Careers</li>
//                         <li>Press Releases</li>
//                         <li>ShopSpotlight Blog</li>
//                     </ul>
//                 </div>
//                 <div className="footer-section">
//                     <h3>Connect with Us</h3>
//                     <ul className="social-icons">
//                         <li><RiFacebookFill /></li>
//                         <li><AiOutlineInstagram /></li>
//                         <li><AiOutlineTwitter /></li>
//                         <li><BsYoutube /></li>
//                     </ul>
//                 </div>
//                 <div className="footer-section">
//                     <h3>Make Money with Us</h3>
//                     <ul>
//                         <li>Sell on ShopSpotlight</li>
//                         <li>Become an Affiliate</li>
//                         <li>Advertise Your Products</li>
//                         <li>Earn through Referrals</li>
//                     </ul>
//                 </div>
//                 <div className="footer-section">
//                     <h3>Let Us Help You</h3>
//                     <ul>
//                         <li>Your Account</li>
//                         <li>Shipping Rates</li>
//                         <li>Returns</li>
//                         <li>FAQs</li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="footer-bottom">
//                 <p>&copy; {new Date().getFullYear()} ShopSpotlight.com. All Rights Reserved.</p>
//             </div>
//         </footer>
//     )
// }

// export default Footer;

import React from 'react';
import '../css/footer.css';
import { RiFacebookFill, RiLinkedinFill, RiTwitterFill } from 'react-icons/ri';
import { FaShopify } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1 className='logo'><FaShopify/> ShopSpotlight.com</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim voluptatibus incidunt error soluta eos reiciendis culpa est earum quas non, voluptate voluptatem at beatae? Magni cumque ipsam harum voluptatum ipsa.</p>
                <div className="footer-social-icons">
                    <RiFacebookFill style={{ fontSize: '30px' }}/>
                    <RiTwitterFill style={{ fontSize: '30px' }}/>
                    <RiLinkedinFill style={{ fontSize: '30px' }}/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@shopspotlight.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">&copy; {new Date().getFullYear()} ShopSpotlight.com. All Rights Reserved.</p>
    </div>
  )
}

export default Footer;