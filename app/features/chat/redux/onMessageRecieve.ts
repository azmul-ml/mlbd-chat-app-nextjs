import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const onClientStablish = (client: any, dispatch: any) => {
  client.onMessageRecieved((res: any) => dispatch(onMessageReceiveTunk(res)));
};
export const onMessageReceiveTunk = createAsyncThunk(
  "chat/client",
  (client: any) => client
);
const initialState = {
  data: [],
};

export const onMessageRecieveSlice = createSlice({
  name: "on-message-recieve",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onMessageReceiveTunk.fulfilled, (state, action) => {
      state.data = action.payload || [];
    });
  },
});

export default onMessageRecieveSlice.reducer;
