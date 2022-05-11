import { IGroupResponse } from "./../../../../src/features/room/group/types/group-chat.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onDeleteGroupThunk = createAsyncThunk(
  "chat/onDeleteGroup",
  (group: any) => {
    console.log(group);
    return group;
  }
);
interface IState {
  data: IGroupResponse | null;
}
const initialState: IState = {
  data: null,
};

export const onDeleteGroupSlice = createSlice({
  name: "on-delete-group",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onDeleteGroupThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default onDeleteGroupSlice.reducer;
