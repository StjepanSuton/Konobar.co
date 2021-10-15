import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    snackbarIsVisible: false,
    searchIsClicked: false,
    userIsLoading: localStorage.getItem("userIsLoading"),
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
    userIsLoadingHandler(state, action) {
      state.userIsLoading = action.payload;
      localStorage.setItem("userIsLoading", state.userIsLoading);
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
