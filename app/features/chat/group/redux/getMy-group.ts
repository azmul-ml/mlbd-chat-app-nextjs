import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMyGroupList } from "../api/group-chat.api";

// export const getMyGroup = createAsyncThunk(
//   "get/group",
//   (data, { dispatch }) => {
//     getMyGroupList(data).then(
//       (res) => {
//         console.log(res.data);
//         return res;
//       },
//       (err) => err.message
//     );
//   }
// );

export const getMyGroup = createAsyncThunk(
  "get/user",
  async (data: any) => {
    const res = await getMyGroupList(data);
    return res.data;
  }
  // (err) => err.message
);
