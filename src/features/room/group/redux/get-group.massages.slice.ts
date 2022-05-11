import { IMessageRecieve } from "../types/group-chat.types";
import { getGroupMessagesApi } from "../api/group-chat.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  messages: IMessageRecieve | null;
}
const initialState: IState = {
  messages: null,
};

export const getGroupMessages = createAsyncThunk(
  "get/group-messages",
  async ({ data, limit }: any) => {
    const res = await getGroupMessagesApi(data, limit);
    return res.data;
  }
);

export const getGroupMessagesSlice = createSlice({
  name: "group-messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export default getGroupMessagesSlice.reducer;
