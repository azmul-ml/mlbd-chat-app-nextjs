import { LoginCredentials, RegistrationCredentials } from "../types/auth.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../api/auth.api";

import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";
import cookie from "react-cookies";
import { exClientChat } from "../../room/redux/chat-client.slice";
import { getMyGroup } from "../../room/group/redux/getMy-group";

// import { exClientChatTh } from "../../chat/redux/chat-client.slice";

const initialState = {
  data: {
    profile_image_link: null,
    name: "",
    email: "",
    user_id: "",
  },
};

export const loginUser = createAsyncThunk(
  "auth/login",
  (credentials: LoginCredentials, { dispatch }) =>
    loginApi(credentials).then(
      (res: any) => {
        cookie.save(AUTH_ACCESS_TOKEN, res.data.token, {});
        if (res.data.data.email === "bradpitt@gmail.com") {
          res.data.data.profile_image_link =
            "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/155592469/original/16fd2f36d6111d47dc9e4dc417cdd26b98959fe2/make-a-cool-cartoon-for-you.jpg";
        } else if (res.data.data.email === "marykate@gmail.com") {
          res.data.data.profile_image_link =
            "https://i.etsystatic.com/15418561/c/2250/1788/0/230/il/f06c80/3233862560/il_340x270.3233862560_jwqd.jpg";
        } else if (res.data.data.email === "joematch@gmail.com") {
          res.data.data.profile_image_link =
            "https://pbs.twimg.com/media/Dyg-OCfW0AA9dKp.jpg";
        } else if (res.data.data.email === "kimwest@gmail.com") {
          res.data.data.profile_image_link =
            "https://www.seekpng.com/png/small/200-2009935_toilet-png-by-dianasurvive-cool-profile-pics-gaming.png";
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
        return res.data;
      },
      (err) => err.message
    )
);

export default authSlice.reducer;
