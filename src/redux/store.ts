import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
	reducer: { filterReducer, cartReducer, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
