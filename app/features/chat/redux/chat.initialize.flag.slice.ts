import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const onChatInitSlice = createSlice({
  name: "chat/init-slice",
  initialState: { data: false },
  reducers: {
    onChatInit: (state) => {
      state.data = true;
    },
  },
});

export default onChatInitSlice.reducer;
