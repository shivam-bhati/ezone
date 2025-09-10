// context/CartContext.jsx
'use client';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          totalItems: state.totalItems + action.payload.quantity
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload }],
          totalItems: state.totalItems + action.payload.quantity
        };
      }
    
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity
      };
    
    case 'UPDATE_QUANTITY':
      const oldItem = state.items.find(item => item.id === action.payload.id);
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems - oldItem.quantity + action.payload.quantity
      };
    
    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalItems: 0
};

// localStorage utility functions
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('shopease_cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('shopease_cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return initialState;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    if (savedCart && (savedCart.items.length > 0 || savedCart.totalItems > 0)) {
      dispatch({
        type: 'LOAD_CART',
        payload: savedCart
      });
    }
  }, []);

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    saveCartToLocalStorage(state);
  }, [state]);

  const addToCart = (product, quantity) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.discountedPrice || product.originalPrice,
        originalPrice: product.originalPrice,
        quantity: quantity,
        addedAt: new Date().toISOString()
      }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Added the missing getTotalItems function
  const getTotalItems = () => {
    return state.totalItems;
  };

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
      getTotalItems // Added this to the context value
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
