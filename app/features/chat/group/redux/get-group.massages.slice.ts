import { IMessageReceive } from "./../types/group-chat.types";
import { getGroupMessagesApi } from "../api/group-chat.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleGroup: {},
  messages: null,
};

export const getGroupMessages = createAsyncThunk(
  "get/group-messages",
  async (data: any) => {
    const res = await getGroupMessagesApi(data);
    return res.data.reverse();
  }
);

// export const addSingleGroup = createAsyncThunk("get/single-group", async (data: any) => {
//   const res = await
// })
export const getGroupMessagesSlice = createSlice({
  name: "group-messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupMessages.fulfilled, (state, action) => {
      state.messages = action.payload || null;
    });
  },
});

export default getGroupMessagesSlice.reducer;
