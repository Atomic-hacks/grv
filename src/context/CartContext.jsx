import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initialState = {
  cartItems: [],
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + qty }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { id: product.id, qty, product }],
      };
    }
    case "REMOVE":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, qty } : item
        ),
      };
    }
    case "CLEAR":
      return { ...state, cartItems: [] };
    case "OPEN":
      return { ...state, isCartOpen: true };
    case "CLOSE":
      return { ...state, isCartOpen: false };
    case "TOGGLE":
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product, qty = 1) =>
    dispatch({ type: "ADD", payload: { product, qty } });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const updateQty = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const openCart = () => dispatch({ type: "OPEN" });
  const closeCart = () => dispatch({ type: "CLOSE" });
  const toggleCart = () => dispatch({ type: "TOGGLE" });

  const itemCount = useMemo(
    () => state.cartItems.reduce((total, item) => total + item.qty, 0),
    [state.cartItems]
  );

  const subtotal = useMemo(
    () =>
      state.cartItems.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
      ),
    [state.cartItems]
  );

  const value = {
    cartItems: state.cartItems,
    isCartOpen: state.isCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
