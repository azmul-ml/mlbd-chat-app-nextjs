import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IGetAllUser } from "../type/user.types";
import getUsersApi from "../api/user.api";

const initialState: IGetAllUser[] = [
  {
    email: "",
    _id: "",
    name: "",
    profile_image_link: null,
    role: [""],
  },
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: any) => {
      return [...action.payload];
    },
  },
});

export const getUsers = createAsyncThunk("get/user", () =>
  getUsersApi().then(
    (res) => {
      // dispatch()
      return res.data;
    },
    (err) => err.message
  )
);

export default userSlice.reducer;
