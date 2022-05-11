import { IGroupResponse } from "./../../../../src/features/room/group/types/group-chat.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onAddedToGroupThunk = createAsyncThunk(
  "chat/onAddedToGroup",
  (group: IGroupResponse) => {
    return group;
  }
);

interface IState {
  data: IGroupResponse | null;
}
const initialState: IState = {
  data: null,
};

export const onAddedToGroupSlice = createSlice({
  name: "on-added-to-group",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onAddedToGroupThunk.fulfilled, (state, action) => {
      state.data = action.payload || null;
    });
  },
});

export default onAddedToGroupSlice.reducer;
