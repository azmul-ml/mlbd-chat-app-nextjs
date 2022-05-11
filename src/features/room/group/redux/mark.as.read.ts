import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { markAsReadApi } from "../api/group-chat.api";
import { IMarkRead } from "../types/group-chat.types";

export const markAsReadThunk = createAsyncThunk(
  "message/read",
  (credentials: IMarkRead, { dispatch }) =>
    markAsReadApi(credentials).then(
      (res) => {
        return res;
      },
      (err) => err.message
    )
);
