import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onMessageReceiveTunk = createAsyncThunk(
  "chat/receive-message",
  (message: any) => {
    return message;
  }
);
const initialState = {
  data: null,
};

export const onMessageRecieveSlice = createSlice({
  name: "on-message-recieve",
  initialState: initialState,
  reducers: {
    resetOnMessageReceive: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onMessageReceiveTunk.fulfilled, (state, action) => {
      state.data = action.payload || null;
    });
  },
});

export default onMessageRecieveSlice.reducer;
