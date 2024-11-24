import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = combineReducers({auth: authReducer,users: userReducer,products: productReducer,
    categories: categoryReducer,
    deals: dealReducer,
    viewedProducts: viewedProductsReducer,
    reviews:reviewReducer,
    productDetail: productDetailReducer, 
    cart: cartReducer,
    shippingAddress: shippingAddressReducer,
    order: orderReducer,
    paymentMethod: paymentMethodReducer,});
  const persistedReducer = persistReducer(persistConfig, rootReducer)


  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  export let persistor = persistStore(store);
