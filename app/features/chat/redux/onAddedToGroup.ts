import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onAddedToGroupThunk = createAsyncThunk(
  "chat/onAddedToGroup",
  (group: any) => {
    console.log(group);
    return group;
  }
);
const initialState = {
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
