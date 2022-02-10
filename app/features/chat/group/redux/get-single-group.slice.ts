import { getSingleGroupApi } from "../api/group-chat.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleGroup: {},
  currentGroup: {},
};

export const getSingleGroup = createAsyncThunk(
  "get/group",
  async (data: any) => {
    const res = await getSingleGroupApi(data);
    console.log(res);
    return res.data;
  }
  // (err) => err.message
);
export const singleGroupSlice = createSlice({
  name: "single-group",
  initialState,
  reducers: {
    addSingleGroup: (state, action: any) => {
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleGroup.fulfilled, (state, action) => {
      state.currentGroup = action.payload;
    });
  },
});

export default singleGroupSlice.reducer;
