import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteGroupChat } from "../api/group-chat.api";
import { ICreateGroupChat } from "../types/group-chat.types";

export const deleteGroup = createAsyncThunk(
  "update/group",
  (credentials: ICreateGroupChat, { dispatch }) =>
    deleteGroupChat(credentials).then(
      (res) => {
        return res;
      },
      (err) => err.message
    )
);
