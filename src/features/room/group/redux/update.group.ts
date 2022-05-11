import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { updateGroupChat } from "../api/group-chat.api";
import { ICreateGroupChat } from "../types/group-chat.types";

export const updateGroup = createAsyncThunk(
  "update/group",
  (credentials: ICreateGroupChat, { dispatch }) =>
    updateGroupChat(credentials).then(
      (res) => {
        return res;
      },
      (err) => err.message
    )
);
