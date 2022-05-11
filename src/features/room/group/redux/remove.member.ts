import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { removeGroupMemberApi } from "../api/group-chat.api";
import { IAddMember } from "../types/group-chat.types";

export const removeGroupMemberSlice = createAsyncThunk(
  "remove/member",
  (credentials: IAddMember, { dispatch }) =>
    removeGroupMemberApi(credentials).then(
      (res) => {
        console.log(res);
        return null;
      },
      (err) => err.message
    )
);
