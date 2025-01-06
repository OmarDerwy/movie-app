import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlist";

export default configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});
