import { IGroupResponse } from "./../../../../src/features/room/group/types/group-chat.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onGroupMemberAddedThunk = createAsyncThunk(
  "chat/onGroupMemberAdded",
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

export const onGroupMemberAddedSlice = createSlice({
  name: "on-group-member-added",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onGroupMemberAddedThunk.fulfilled, (state, action) => {
      state.data = action.payload || null;
    });
  },
});

export default onGroupMemberAddedSlice.reducer;
