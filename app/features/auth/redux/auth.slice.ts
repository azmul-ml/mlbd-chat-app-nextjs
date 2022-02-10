import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import { exClientChat } from "../../chat/redux/chat-client.slice";
// import { exClientChatTh } from "../../chat/redux/chat-client.slice";

import { loginApi, registerApi } from "../api/auth.api";
import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";
import { LoginCredentials, RegistrationCredentials } from "../types/auth.types";
const initialState = {
  data: {
    username: "",
    email: "",
    isFething: false,
    isSuccess: false,
    isError: false,
    errormessage: "",
  },
};

export const loginUser = createAsyncThunk(
  "auth/login",
  (credentials: LoginCredentials, { dispatch }) =>
    loginApi(credentials).then(
      (res: any) => {
        cookie.save(AUTH_ACCESS_TOKEN, res.data.token, {});
        if (res.data) {
          exClientChat(dispatch);
        }
        return res.data;
      },
      (err) => err.message
    )
);
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const registerUser = createAsyncThunk(
  "auth/register",
  (credentials: RegistrationCredentials, { dispatch }) =>
    registerApi(credentials).then(
      (res) => {
        // cookie.save(AUTH_ACCESS_TOKEN, res.data.token, {});

        return res.data;
      },
      (err) => err.message
    )
);

export default authSlice.reducer;
