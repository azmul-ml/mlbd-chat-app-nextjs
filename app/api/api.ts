import axios, { AxiosRequestConfig } from "axios";

import { ENV } from "../constants/env";
import { AuthEndpointsEnum, getTokens } from "../features/auth";

/**
 * All the endpoint that do not require an access token
 */
const anonymousEndpoints = [AuthEndpointsEnum.LOGIN.toString()];

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = async (request: AxiosRequestConfig) => {
  const { accessToken } = getTokens();

  const isAnonymous = anonymousEndpoints.some((endpoint) =>
    request.url?.startsWith(endpoint)
  );

  if (accessToken) {
    request.headers.Authorization = `bearer ${accessToken}`;
    return request;
  }

  if (!accessToken && !isAnonymous) {
    // TODO: handle when UNAUTHORIZED;
    // return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
    return request;
  }

  return request;
};

// const authInterceptor2 = async (request: AxiosRequestConfig) => {
//   const { accessToken } = getTokens();

//   const isAnonymous = anonymousEndpoints.some((endpoint) =>
//     request.url?.startsWith(endpoint)
//   );

//   if (accessToken) {
//     request.headers.Authorization = `bearer ${accessToken}`;
//     return request;
//   }

//   if (!accessToken && !isAnonymous) {
//     // TODO: handle when UNAUTHORIZED;
//     // return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
//     return request;
//   }

//   return request;
// };

// /** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: { "Content-Type": "application/json" },
});

export const apiAuth = axios.create({
  baseURL: ENV.API_HOST_LOGIN,
  headers: { "Content-Type": "application/json" },
});

apiAuth.interceptors.request.use(authInterceptor);
api.interceptors.request.use(authInterceptor);
