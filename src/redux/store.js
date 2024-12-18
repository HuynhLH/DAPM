import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import dealReducer from "./dealSlice";
import viewedProductsReducer from './viewedProductsSlice';
import reviewReducer from './reviewSlice';
import productDetailReducer from './productDetailSlice';
import cartReducer from './cartSlice';
import shippingAddressReducer from './shippingSlice';
import orderReducer from './orderSlice';
import paymentMethodReducer from './paymentMethodSlice';



export default configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        users: userReducer,
        categories: categoryReducer,
        deals: dealReducer,
        viewedProducts: viewedProductsReducer,
        reviews:reviewReducer,
        productDetail: productDetailReducer,
        cart: cartReducer,
        shippingAddress: shippingAddressReducer,
        order: orderReducer,
        paymentMethod: paymentMethodReducer,

    },
});
