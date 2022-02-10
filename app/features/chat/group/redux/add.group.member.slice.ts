import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { addGroupMemberApi } from "../api/group-chat.api";
import { IAddMember } from "../types/group-chat.types";

export const addGroupMemberSlice = createAsyncThunk(
  "add/member",
  (credentials: IAddMember, { dispatch }) =>
    addGroupMemberApi(credentials).then(
      (res) => {
        return null;
      },
      (err) => err.message
    )
);
