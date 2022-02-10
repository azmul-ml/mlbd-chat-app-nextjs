export type TokenDef = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export type CookieTokenDef = Pick<TokenDef, "accessToken" | "tokenType"> & {
  expiresAt: Date;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegistrationCredentials = {
  name: string;
  email: string;
  password: string;
  roles: Array<string>;
};
export interface ILoggedInUse {
  profile_image_link: null | string;
  name: string;
  email: string;
  user_id: string;
}
