// import React, { useEffect, useState } from 'react';
// import '../css/productdetails.css';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [productdata, setproductdata] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   const getsingleproductlist = () => {
//     axios.get('http://localhost:5000/products/singleproductlist/' + id).then((response) => {
//       setproductdata(response.data.message);
//     });
//   };

//   useEffect(() => {
//     getsingleproductlist();
//   }, [id]);

//   const handleAddToCart = (product) => {
//     const cartItems = JSON.parse(localStorage.getItem('cart') || []);
//     const isAlreadyInCart = cartItems.some(item => item.id === product.id);

//     if (isAlreadyInCart) {
//       alert('Product is already added to cart!');
//     } else {
//       const updatedCart = [...cartItems, { ...product, quantity }];
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       navigate('/cart');
//     }

//   };

//   return (
//     <div className="product-container">
//       {productdata.length > 0 ? (
//         productdata.map((product) => (
//           <div key={product.id} className="product-details-container">
//             <div className="product-image-section">
//               <img className="product-image" src={product.img} alt={product.title} />
//             </div>
//             <div className="product-details-section">
//               <h2 className="product-title">{product.title}</h2>
//               <p className="product-price">
//                 <span className="discount">-23%</span> ₹{product.price}
//               </p>
//               <p className="inclusive-taxes">Inclusive of all taxes</p>
//               <p className="product-category">
//                 <strong>Category:</strong> {product.category}
//               </p>
//               <p className="product-description">
//                 <strong>Description:</strong> {product.description}
//               </p>

//               <div className="quantity-selector">
//                 <label>Quantity:</label>
//                 <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
//                 <span>{quantity}</span>
//                 <button onClick={() => setQuantity(quantity + 1)}>+</button>
//               </div>

//               <button className='addtocart-btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Loading product details...</p>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;


// import React, { useEffect, useState } from 'react';
// import '../css/productdetails.css';
// import { useNavigate, useParams } from 'react-router-dom';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [productdata, setProductData] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();

//   const getSingleProductList = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/products/singleproductlist/${id}`);
//       const data = await response.json();
//       setProductData([data.message]);  // Ensure productdata is always an array
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     }
//   };

//   useEffect(() => {
//     getSingleProductList();
//   }, [id]);

//   const handleAddToCart = (product) => {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Default to an empty array
//     const isAlreadyInCart = cartItems.some(item => item.id === product.id);

//     if (isAlreadyInCart) {
//       alert('Product is already added to cart!');
//     } else {
//       const updatedCart = [...cartItems, { ...product, quantity }];
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       navigate('/cart');
//     }
//   };

//   return (
//     <div className="product-container">
//       {productdata.length > 0 ? (
//         productdata.map((product) => (
//           <div key={product.id} className="product-details-container">
//             <div className="product-image-section">
//               <img className="product-image" src={product.img} alt={product.title} />
//             </div>
//             <div className="product-details-section">
//               <h2 className="product-title">{product.title}</h2>
//               <p className="product-price">
//                 <span className="discount">-23%</span> ₹{product.price}
//               </p>
//               <p className="inclusive-taxes">Inclusive of all taxes</p>
//               <p className="product-category">
//                 <strong>Category:</strong> {product.category}
//               </p>
//               <p className="product-description">
//                 <strong>Description:</strong> {product.description}
//               </p>

//               <div className="quantity-selector">
//                 <label>Quantity:</label>
//                 <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
//                 <span>{quantity}</span>
//                 <button onClick={() => setQuantity(quantity + 1)}>+</button>
//               </div>

//               <button className='addtocart-btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Loading product details...</p>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from 'react';
import "../css/productdetails.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from "../assets/frontend_assets/assets"
import { useDispatch } from 'react-redux';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FaCheckCircle, FaCreditCard, FaTimesCircle, FaUser } from 'react-icons/fa';

const ProductDetails = () => {
  const [productdetails, setproductdetails] = useState('');
  // const product_id = localStorage.getItem('product_id');
  const params = useParams();
  // const [cartArray, setCartArray] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const getsingleproductlist = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products/singleproductlist/${params.id}`).then((response) => {
      console.log(response.data.message);

      setproductdetails(response.data.message[0]);

    });
  };

  useEffect(() => {
    // if(!items.length){
    //   const jsonItems = localStorage.getItem("addtocart");
    //   const localItems = JSON.parse(jsonItems);
    //   setItems(jsonItems)
    // }
    getsingleproductlist();
  }, []);

  // let cartArray = [];
  // let oldCart = [];

  // const handleAddToCart = (id) => {

  //   // oldCart = localStorage.getItem('addtocart');
  //   // console.log(oldCart.push(id));

  //   // setCartArray(cartArray => [...oldCart,id] );
  //   // console.log(cartArray);

  //   // cartArray.push(id);
  //   // localStorage.setItem('addtocart', cartArray);
  //   // let string = JSON.stringify(students)
  //   // localStorage.setItem("students", string)
  // }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product_id: productdetails.product_id,
        product_name: productdetails.product_name,
        product_price: productdetails.product_price,
        product_image: productdetails.product_image,
        quantity: quantity
      }
    });
    alert("Added to cart!");
  };

  const handleBuyNow = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/products/buynow`, {
        product_id: productdetails.product_id,
        quantity: quantity,
      });

      if (res.data.success) {
        alert("Purchase successful!");
        navigate('/payment');
      } else {
        alert("Not enough stock!");
      }
    } catch (error) {
      console.error("Buy now failed:", error);
    }
  };

  return (
    <div className="product-container">

      {/* Left Side - Product Image */}
      <div className="product-image">
        <img
          src={productdetails.product_image}
          alt={productdetails.product_name}
        />
      </div>

      {/* Right Side - Product Details */}
      <div className="product-details">
        <h2>{productdetails.product_name}</h2>
        <p className="category">{productdetails.cat}</p>
        <p className="rating">
          <img src={assets.rating_starts} /> 4.1 <span>(420 ratings)</span>
        </p>

        <div className="price-section">
          <span className="discount">-60%</span>
          <span className="price">{productdetails.product_price}</span>
          <span className="original-price">₹3,199</span>
        </div>

        <p className="inclusive">Inclusive of all taxes</p>
        <p className="emi">EMI starts at ₹116 per month</p>

        <div className="offers">
          <p><MdOutlineLocalOffer/> Cashback: Upto ₹38.19 cashback on Pay</p>
          <p><FaCreditCard/> Bank Offer: Up to ₹1,000 discount on Credit Cards</p>
          <p><FaUser/> Partner Offers: Get GST Invoice for 28% savings</p>
        </div>

        <div className="quantity-selector">
          {productdetails.product_qty > 0 && <>
            <label>Quantity:</label>
            <button onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}><img src={assets.remove_icon_red} /></button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}><img src={assets.add_icon_green} /></button>
          </>}
        </div>
        <p className="stock" style={{ color: productdetails.product_qty > 0 ? 'green' : 'red' }}>
          {productdetails.product_qty > 0 ? <FaCheckCircle style={{ marginRight: '5px' }} /> : <FaTimesCircle style={{ marginRight: '5px' }} />}
          {productdetails.product_qty > 0 ? "In stock" : "Out of stock"}
        </p>
        {productdetails.product_qty > 0 && <div className="buttons">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>}
      </div>
    </div>
  );
};

export default ProductDetails;
