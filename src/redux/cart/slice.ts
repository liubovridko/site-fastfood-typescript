import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const cartData = getCartFromLS();
const initialState: CartSliceState = {
	totalPrice: cartData.totalPrice,
	items: cartData.items,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			/*state.items.push(action.payload);
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price + sum;
			}, 0);*/
			const findItem = state.items.find(
				(obj) => obj.id == action.payload.id,
			);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(
				(obj) => obj.id == action.payload,
			);
			if (findItem) {
				findItem.count--;
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id == action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
