import { apiAuth } from "../../../api/api";
import { AxiosResponse } from "axios";
import { AuthEndpointsEnum } from "../constants/auth.endpoints";
import { LoginCredentials, RegistrationCredentials } from "../types/auth.types";

// eslint-disable-next-line import/prefer-default-export
export const loginApi = (data: LoginCredentials): Promise<AxiosResponse> =>
  apiAuth.post(`${AuthEndpointsEnum.LOGIN}`, data);

export const registerApi = (
  data: RegistrationCredentials
): Promise<AxiosResponse> =>
  apiAuth.post(`${AuthEndpointsEnum.REGISTER}`, data);
