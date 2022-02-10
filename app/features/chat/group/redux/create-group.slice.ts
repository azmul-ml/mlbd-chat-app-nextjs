import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import createGroupChat from "../api/group-chat.api";
import { ICreateGroupChat } from "../types/group-chat.types";

export const creatGroupSlice = createAsyncThunk(
  "create/group",
  (credentials: ICreateGroupChat, { dispatch }) =>
    createGroupChat(credentials).then(
      (res) => {
        return null;
      },
      (err) => err.message
    )
);
