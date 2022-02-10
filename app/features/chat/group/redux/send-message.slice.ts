import { sendGroupMessageApi } from "../api/group-chat.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "get/group",
  async (data: any) => {
    const res = await sendGroupMessageApi(data);
    return res.data;
  }
  // (err) => err.message
);
