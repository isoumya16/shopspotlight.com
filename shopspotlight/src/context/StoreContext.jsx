// import { createContext, useState } from "react";
// import { productlist } from "../assets/frontend_assets/assets";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState({});

//     const addtocart = (itemId) => {
//         if (!cartItems[itemId]) {
//             setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
//         }
//         else {
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//         }
//     }

//     const removefromcart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
//     }

//     const gettotalcartamount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 let itemInfo = productlist.find((product) => product._id === item);
//                 totalAmount += itemInfo.price * cartItems[item];
//             }
//         }

//         return totalAmount;
//     }

// const contextValue = {
//     cartItems,
//     setCartItems,
//     productlist,
//     addtocart,
//     removefromcart,
//     gettotalcartamount
// }

// return (
//     <StoreContext.Provider value={contextValue}>
//         {props.children}
//     </StoreContext.Provider>
// )
// }


// export default StoreContextProvider;