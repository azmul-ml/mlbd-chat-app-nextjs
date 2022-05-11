import { IGroupResponse } from "./../../../../../src/features/room/group/types/group-chat.types";
import { getSingleGroupApi } from "../api/group-chat.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IState {
  currentGroup: IGroupResponse | null;
}
const initialState: IState = {
  currentGroup: null,
};

export const getSingleGroup = createAsyncThunk(
  "get/group",
  async (data: any) => {
    const res = await getSingleGroupApi(data);
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
