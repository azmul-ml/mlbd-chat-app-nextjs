import { IGroupResponse } from "./../../../../src/features/room/group/types/group-chat.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onGroupMemberRemovedThunk = createAsyncThunk(
  "chat/onGroupMemberRemoved",
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

export const onGroupMemberRemovedSlice = createSlice({
  name: "on-group-member-removed",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onGroupMemberRemovedThunk.fulfilled, (state, action) => {
      state.data = action.payload || null;
    });
  },
});

export default onGroupMemberRemovedSlice.reducer;
