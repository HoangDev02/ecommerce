import {configureStore,combineReducers } from '@reduxjs/toolkit' 
import authReducer from './authSlice'
import userSlide from './userSlide'
import productSlide from './productSlide';
import cartSlide from './cartSlide'
import categorySlice from './categorySlice';
import searchSlice from './searchSlice';
import commentSlice from './commentSlide';
import techSpecsSlice from './techSpecsSlide';
import reviewsSlice from './reviewsSlide';
import orderSlide from './orderSlide';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
const rootReducer = combineReducers({ 
  auth: authReducer, 
  users: userSlide, 
  products: productSlide, 
  carts: cartSlide, 
  categories: categorySlice, 
  searchs: searchSlice, 
  comments: commentSlice,
  techSpecs: techSpecsSlice,
  reviews: reviewsSlice,
  orders: orderSlide
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
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