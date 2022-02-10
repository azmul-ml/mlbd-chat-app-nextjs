import { getGroupMessagesApi } from "../api/group-chat.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleGroup: {},
};
export const getGroupMessagesSlice = createSlice({
  name: "single-group",
  initialState,
  reducers: {
    addSingleGroup: (state, action: any) => {
      return { ...action.payload };
    },
  },
});

export const getGroupMessages = createAsyncThunk(
  "get/group",
  async (data: any) => {
    const res = await getGroupMessagesApi(data);
    return res.data;
  }
  // (err) => err.message
);

export default getGroupMessagesSlice.reducer;
