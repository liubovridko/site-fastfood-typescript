import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
	reducer: { filterReducer, cartReducer, pizza },
});
