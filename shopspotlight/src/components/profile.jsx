// import React, { useEffect, useState } from "react";
// import "../css/profile.css";
// import axios from "axios";
// import { FaEdit } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [profiledata, setprofiledata] = useState('');
//   const user_id = localStorage.getItem('user_id');
//   const navigate = useNavigate();

//   const getsingleuserlist = () => {
//     axios.get('http://localhost:5000/users/singleuserlist/' + user_id).then((response) => {
//       console.log(response.data.message);

//       setprofiledata(response.data.message[0]);
//     })
//   };

//   useEffect(() => {
//     getsingleuserlist();
//   }, []);

//   return (
//     <div className="profile-container">
//       <h2>User Profile</h2>
//       <div className="profile-details">
//         <img
//           src={profiledata.user_image}
//           alt="Profile Picture"
//           height="100%"
//           width="100%"
//         />
//         <p>
//           <strong>First Name:</strong> {profiledata.firstname || "N/A"}
//         </p>
//         <p>
//           <strong>Last Name:</strong> {profiledata.lastname || "N/A"}
//         </p>
//         <p>
//           <strong>Mobile Number:</strong> {profiledata.mobileno || "N/A"}
//         </p>
//         <p>
//           <strong>Email:</strong> {profiledata.email || "N/A"}
//         </p>
//         <p>
//           <strong>Password:</strong> {profiledata.password || "N/A"}
//         </p>
//         <p>
//           <strong>Role:</strong> {profiledata.useraccess || "N/A"}
//         </p>
//       </div>
//       <div onClick={()=> navigate('/admin/edituser/' + user_id)}><FaEdit/></div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import "../css/profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBox, FaChartBar, FaCreditCard, FaEdit, FaHeart, FaHome, FaLanguage, FaPhone, FaQuestion, FaShieldAlt, FaShoppingBag, FaShoppingBasket, FaStar, FaWallet } from "react-icons/fa";

const Profile = () => {
  const [profiledata, setprofiledata] = useState('');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const getsingleuserlist = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/singleuserlist/${user_id}`).then((response) => {
      console.log(response.data.message);

      setprofiledata(response.data.message[0]);
    })
  };

  useEffect(() => {
    getsingleuserlist();
  }, []);
  return (
    <div className="profile-container">
      <div className="button-grid">
        <h2>Hi {profiledata.firstname}</h2>
        <img className="profile_image"
          src={profiledata.user_image}
          alt="Profile Picture"
          height="70px"
          width="70px"
        />
        <p className="email">{profiledata.email}</p>
      </div>

      <div className="button-grid">
        <button><FaBox color="#ffc0cb" /> Orders</button>
        <button><FaHeart color="#ff0000"/> Saved Items</button>
        <button><FaLanguage color="#add8e6"/> Language</button>
        <button><FaPhone color="#ff0000"/> Contact Us</button>
      </div>

      <div className="section">
        <h3>Credit Options</h3>
        <ul>
          <li><FaCreditCard color="#ba8e23"/> Personal Loan - Get loan up to 5 Lakhs instantly</li>
          <li><FaShoppingBag color="#00008b"/> Buy Now Pay Later - Get what you love and pay later</li>
          <li><FaChartBar color="008000"/> Check credit score - Free score check. Personalized loan offers</li>
        </ul>
      </div>

      <div className="section">
        <h3>Account Settings</h3>
        <ul>
          <li><FaWallet color="#964b00"/> My Cards and Wallet</li>
          <li><FaHome color="#aef5cd"/> Saved Addresses</li>
          <li onClick={() => navigate('/admin/edituser/' + user_id)}><FaEdit color="#f455cd"/> Edit Profile</li>
        </ul>
      </div>

      <div className="section">
        <h3>My Activity</h3>
        <ul>
          <li> <FaStar color="#ba8e23"/> Reviews</li>
          <li><FaQuestion color="#ff0000"/> Questions & Answers</li>
        </ul>
      </div>

      <div className="section">
        <h3>Become a Supplier</h3>
        <ul>
          <li><FaShoppingBasket color="#a9a9a9"/> Supplier Hub - Online selling made simple</li>
        </ul>
      </div>

      <div className="section">
        <h3>Feedback & Information</h3>
        <ul>
          <li><FaShieldAlt color="#41924b"/> Terms, Policies and Licenses</li>
          <li><FaStar color="#ba8e23"/> Rate ShopSpotlight App</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
