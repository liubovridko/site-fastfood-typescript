import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
	id: string;
	count: number;
	title: string;
	price: number;
	image: string;
	type: string;
	size: number;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
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

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
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

export const selectCart = (state: RootState) => state.cartReducer;
export const selectCartItemById = (id: string) => (state) =>
	state.cartReducer.items.find((obj) => obj.id == id);

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
