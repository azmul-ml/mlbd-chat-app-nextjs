import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onMessageReceiveTunk = createAsyncThunk(
  "chat/receive-message",
  (message: any) => {
    return message;
  }
);
const initialState = {
  data: null,
  stateForGroupDot: [],
};

export const onMessageRecieveSlice = createSlice({
  name: "on-message-recieve",
  initialState: initialState,
  reducers: {
    resetOnMessageReceive: (state) => {
      state.data = null;
    },
    onGroupClickGroup: (state, action) => {
      state.stateForGroupDot = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onMessageReceiveTunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload || null;
      state.stateForGroupDot = [...state.stateForGroupDot, action.payload];
    });
  },
});

export default onMessageRecieveSlice.reducer;
