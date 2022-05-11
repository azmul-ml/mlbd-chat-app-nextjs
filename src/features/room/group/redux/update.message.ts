import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { updateGroupMessage } from "../api/group-chat.api";
import { ISentMessage } from "../types/group-chat.types";

export const updateMessage = createAsyncThunk(
  "update/message",
  (credentials: ISentMessage, { dispatch }) =>
    updateGroupMessage(credentials).then(
      (res) => {
        return res;
      },
      (err) => err.message
    )
);
