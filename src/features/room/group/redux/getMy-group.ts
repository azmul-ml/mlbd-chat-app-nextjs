import { AxiosResponse } from "axios";
import { IGroupResponse } from "../types/group-chat.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getMyGroupList } from "../api/group-chat.api";

export const getMyGroup = createAsyncThunk("group/get", async (data: any) => {
  const res: AxiosResponse<IGroupResponse[]> = await getMyGroupList(data);
  return res.data;
});

interface IGroupState {
  data: IGroupResponse[] | undefined;
}

const initialState: IGroupState = {
  data: undefined,
};

export const getMyGroupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    updateGroupArray: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMyGroup.fulfilled,
      (state, action: PayloadAction<IGroupResponse[]>) => {
        state.data = action.payload.length > 0 ? action.payload : [];
      }
    );
  },
});

export default getMyGroupsSlice.reducer;
