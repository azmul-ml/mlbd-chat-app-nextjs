export interface IGetAllUser {
  email: string;
  name: string;
  profile_image_link: string | null;
  role: [string];
  _id: string;
}

export interface IAllUserRecieved {
  email: string;
  name: string;
  profile_image_link: string | null;
  role: [string];
  _id: string;
}
