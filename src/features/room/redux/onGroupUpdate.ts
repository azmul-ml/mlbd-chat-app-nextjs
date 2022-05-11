import { IGroupResponse } from "./../../../../src/features/room/group/types/group-chat.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onUpdateGroupThunk = createAsyncThunk(
  "chat/onUpdateGroup",
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

export const onUpdateGroupSlice = createSlice({
  name: "on-update-group",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onUpdateGroupThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default onUpdateGroupSlice.reducer;
