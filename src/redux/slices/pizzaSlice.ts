import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

import axios from "axios";

type fetchPizzasArgs = Record<string, string>;

export type SearchPizzaParams = {
	currentPage: string;
	category: string;
	sortBy: string;
	order: string;
	search: string;
};

export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasByParams",
	async (params: SearchPizzaParams /*, thunkAPI*/) => {
		const { currentPage, category, sortBy, order, search } = params;
		const res = await axios.get<Pizza[]>(
			`https://64fb19d3cb9c00518f7aa530.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortBy}&order=${order}${search}`,
		);

		/*if (res.data.length) {
			return thunkAPI.rejectWithValue("Піцци пусті");
		}*/

		return res.data;
	},
);
type Pizza = {
	id: string;
	title: string;
	image: string;
	price: number;
	sizes: number[];
	types: number[];
	rating: number;
};

export enum Status {
	LOADING = "loading",
	SUCCES = "succes",
	ERROR = "error",
}

interface PizzaSliceState {
	items: Pizza[];
	status: Status; //"loading"| "succes"| "error"
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING, //"loading", "succes", "error"
};

export const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = Status.SUCCES;
			state.items = action.payload;
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const selectPizzaData = (state: RootState) => state.pizza;
// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
