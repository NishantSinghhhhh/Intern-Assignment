import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice"; // Import your cart slice reducer

const store = configureStore({
    reducer: {
        cart: cartReducer, // Configure the store with the cart reducer
    },
});

export default store; // Export the store for use in the Provider
