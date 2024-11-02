import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import dealReducer from "./dealSlice";
import recentlyViewedReducer from "./recentlyViewedSlice"; 
import cartReducer from './cartSlice';



export default configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        users: userReducer,
        categories: categoryReducer,
        deals: dealReducer,
        recentlyViewed: recentlyViewedReducer,
        cart: cartReducer,
    },
});
