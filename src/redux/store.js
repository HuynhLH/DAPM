import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import dealReducer from "./dealSlice";
import cartReducer from './cartSlice';
import viewedProductsReducer from './viewedProductsSlice';



export default configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        users: userReducer,
        categories: categoryReducer,
        deals: dealReducer,
        cart: cartReducer,
        viewedProducts: viewedProductsReducer,
    },
});
