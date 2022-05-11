import { IDeleteMessage } from "./../group/types/group-chat.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onMessageDeleteThunk = createAsyncThunk(
  "chat/delete-message",
  (message: any) => {
    console.log(message);
    return message;
  }
);
interface IState {
  data: IDeleteMessage | null;
}
const initialState: IState = {
  data: null,
};

export const onMessageDeleteSlice = createSlice({
  name: "on-message-recieve",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onMessageDeleteThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload || null;
      //   state.stateForGroupDot = [ action.payload];
    });
  },
});

export default onMessageDeleteSlice.reducer;
