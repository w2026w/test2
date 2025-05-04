import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/authSlice";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: { auth: authSlice, products: productSlice, cart: cartSlice },
});
