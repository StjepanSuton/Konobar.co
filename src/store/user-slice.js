import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user"),
    userPhoto: localStorage.getItem("userPhoto"),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
  },
  reducers: {
    logInUser(state, action) {
      const newToken = action.payload;
      state.token = newToken.token;
      localStorage.setItem("token", state.token);
      state.user = newToken.user;
      localStorage.setItem("user", state.user);
      state.userPhoto = newToken.photoURL;
      localStorage.setItem("userPhoto", state.userPhoto);
      state.isLoggedIn = !!newToken;
      localStorage.setItem("isLoggedIn", state.isLoggedIn);
    },
    logOutUser(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userPhoto");
      localStorage.removeItem("isLoggedIn");
      state.token = "";
      state.user = "";
      state.userPhoto = "";
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
