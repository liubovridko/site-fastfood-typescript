import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum; //"rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярні",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.categoryId = 0;
        state.currentPage = 1;
        state.sort = {
          name: "популярні",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});
export const selectFilter = (state: RootState) => state.filterReducer;
export const selectSort = (state: RootState) => state.filterReducer.sort;
// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
