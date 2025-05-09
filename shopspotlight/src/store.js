import { createStore } from 'redux';

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const initialState = loadFromLocalStorage();

const cartReducer = (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case 'ADD_TO_CART':
      if (!Array.isArray(state)) state = [];
      const existingProduct = state.find(item => item.product_id === action.payload.product_id);
      if (existingProduct) {
        newState = state.map(item =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newState = [...state, action.payload];
      }
      break;

    case 'REMOVE_FROM_CART':
      if (!Array.isArray(state)) state = [];
      newState = state.filter(item => item.product_id !== action.payload);
      break;

    default:
      newState = state;
  }

  saveToLocalStorage(newState);
  return newState;
};

const store = createStore(cartReducer);

// Utility function to calculate total
export const getTotalAmount = (cartItems = []) => {
  if (!Array.isArray(cartItems)) return 0;
  return cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
};

export default store;
