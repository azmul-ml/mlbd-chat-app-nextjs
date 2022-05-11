import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteGroupMessage } from "../api/group-chat.api";
import { IDeleteMessage } from "../types/group-chat.types";

export const deleteMessage = createAsyncThunk(
  "update/message",
  (credentials: IDeleteMessage, { dispatch }) =>
    deleteGroupMessage(credentials).then(
      (res) => {
        return res;
      },
      (err) => err.message
    )
);
