import { sendGroupMessageApi } from "../api/group-chat.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "sent/message",
  async ({ data, setImageLoading }: any) => {
    setImageLoading(true);
    const res = await sendGroupMessageApi(data);
    setImageLoading(false);
    return res.data;
  }
  // (err) => err.message
);
