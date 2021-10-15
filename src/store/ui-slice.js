import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    snackbarIsVisible: false,
    searchIsClicked: false,
  },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    snackbarToggle(state, action) {
      const newState = action.payload;
      state.snackbarIsVisible = newState;
    },
    searchIsClicked(state, action) {
      state.searchIsClicked = action.payload;
    },
    searchIsNotClicked(state,action){
      state.searchIsClicked = action.payload;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
