import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [
      localStorage.getItem("items") === null
        ? []
        : JSON.parse(localStorage.getItem("items")),
    ].flat(),
    totalQuantity: localStorage.getItem("totalQuantity"),
    changed: false,
    totalItemsPrice:
      localStorage.getItem("items") === null
        ? 0
        : parseFloat(localStorage.getItem("totalItemsPrice")),
    mostRecentItem: "",
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      state.mostRecentItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalItemsPrice = state.totalItemsPrice + newItem.price;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          mjera: newItem.mjera,
          totalPrice: newItem.price,
          name: newItem.title,
          titleEng: newItem.titleEng,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      localStorage.setItem("items", JSON.stringify(state.items));
      localStorage.setItem("totalQuantity", state.totalQuantity);
      localStorage.setItem("totalItemsPrice", state.totalItemsPrice);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalItemsPrice = state.totalItemsPrice - existingItem.price;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      localStorage.setItem("items", JSON.stringify(state.items));
      localStorage.setItem("totalQuantity", state.totalQuantity);
      localStorage.setItem("totalItemsPrice", state.totalItemsPrice);
    },
    removeAllItems(state) {
      localStorage.removeItem("items");
      localStorage.removeItem("totalQuantity");
      localStorage.removeItem("totalItemsPrice");
      state.items = [];
      state.totalQuantity = 0;
      state.totalItemsPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
