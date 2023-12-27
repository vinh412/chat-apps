import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../fetchApi";

const initialState = {
  user: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async (jwt) => {
  const response = await client.authenticate(jwt);
  return await response.json();
});

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async (loginForm) => {
  const response = await client.login(loginForm);
  return await response.json();
});

export const fetchSignUp = createAsyncThunk("auth/fetchSignUp", async (signUpForm) => {
  const response = await client.signup(signUpForm);
  return await response.json();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    })
    .addCase(fetchSignUp.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
