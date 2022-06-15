import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IGetAllUser } from "../type/user.types";
import getUsersApi from "../api/user.api";

const initialState: IGetAllUser[] = [
  {
    email: "",
    _id: "",
    name: "",
    profile_image_link: null,
    role: [""],
  },
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: any) => {
      return [...action.payload];
    },
  },
});

export const getUsers = createAsyncThunk("get/user", () =>
  getUsersApi().then(
    (res: any) => {
      const users = res.data.data.slice(-20).map((user: any) => {
        if (user.email === "bradpitt@gmail.com") {
          user.profile_image_link =
            "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/155592469/original/16fd2f36d6111d47dc9e4dc417cdd26b98959fe2/make-a-cool-cartoon-for-you.jpg";
        } else if (user.email === "marykate@gmail.com") {
          user.profile_image_link =
            "https://i.etsystatic.com/15418561/c/2250/1788/0/230/il/f06c80/3233862560/il_340x270.3233862560_jwqd.jpg";
        } else if (user.email === "joematch@gmail.com") {
          user.profile_image_link =
            "https://pbs.twimg.com/media/Dyg-OCfW0AA9dKp.jpg";
        } else if (user.email === "kimwest@gmail.com") {
          user.profile_image_link =
            "https://www.seekpng.com/png/small/200-2009935_toilet-png-by-dianasurvive-cool-profile-pics-gaming.png";
        } else {
          user.profile_image_link =
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
        }

        return user;
      });

      return { data: users };
    },
    (err) => err.message
  )
);

export default userSlice.reducer;
