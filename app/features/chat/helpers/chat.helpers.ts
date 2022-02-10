import { TokenProvider } from "@mlbd/chat-client";
import cookie from "react-cookies";
import { AUTH_ACCESS_TOKEN } from "../../auth/constants/auth.keys";

// const getAccessToken = async () => {
//   const token = await cookie.load(AUTH_ACCESS_TOKEN);
//   return token;
// };

/**
 * Token provider for chat client init
 */
export const tokenProvider = new TokenProvider({
  url: `https://ancient-brushlands-82872.herokuapp.com/api/chat/token`,
  getHeaders: async () => {
    const token = await cookie.load(AUTH_ACCESS_TOKEN);

    const headers = {
      "auth-token": `${token}`,
    };

    return headers;
  },
  getBody: () => {
    return Promise.resolve();
  },
});

/**
 * Pusher options
 */

export const pusherOptions = {
  appKey: "91b3fe78f65fb4acdaca",
  cluster: "ap1",
  forceTLS: true,
};
