import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import createGroupChat from "../api/group-chat.api";
import { ICreateGroupChat } from "../types/group-chat.types";

export const creatGroup = createAsyncThunk(
  "create/group",
  (credentials: ICreateGroupChat, { dispatch }) =>
    createGroupChat(credentials).then(
      (res) => {
        return res;
      },
      (err) => err.message
    )
);

export const createGroupSlice = createSlice({
  name: "group/modal-open",
  initialState: { openGroupModal: false },
  reducers: {
    triggerGroupModal: (state, action) => {
      console.log(state.openGroupModal);
      state.openGroupModal = action.payload;
    },
  },
});

export default createGroupSlice.reducer;
