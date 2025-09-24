import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../features/ProductStoreSlice";
import favoriteStoreSliceReducer from "../features/FavoriteStoreSlice";
import CartSliceReducer from "../features/CartSlice";

// import logger from "redux-logger";
export const store = configureStore({
  reducer: {
    products: productSliceReducer,
    favoriteProducts: favoriteStoreSliceReducer,
    cart: CartSliceReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
