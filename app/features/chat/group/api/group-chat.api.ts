import { api } from "../../../../api/api";
import { AxiosResponse } from "axios";
import { ChatEndpointsEnum } from "../constants/group-chat.endpoints";
import {
  IAddMember,
  ICreateGroupChat,
  IGetSingleGroup,
  ISentMessage,
} from "../types/group-chat.types";

// eslint-disable-next-line import/prefer-default-export
const createGroupChat = (data: ICreateGroupChat): Promise<AxiosResponse> =>
  api.post(`${ChatEndpointsEnum.CREATE_GROUP}`, data);

export const getMyGroupList = (data: any): Promise<AxiosResponse> =>
  api.post(`${ChatEndpointsEnum.GET_MY_GROUP_LIST}`, data);

export default createGroupChat;

export const getSingleGroupApi = (
  data: IGetSingleGroup
): Promise<AxiosResponse> =>
  api.post(`${ChatEndpointsEnum.GET_SINGLE_GROUP}`, data);

export const sendGroupMessageApi = (
  data: ISentMessage
): Promise<AxiosResponse> =>
  api.post(`${ChatEndpointsEnum.SEND_MESSAGE}`, data);

export const getGroupMessagesApi = (
  data: IGetSingleGroup
): Promise<AxiosResponse> =>
  api.post(`${ChatEndpointsEnum.GET_GROUP_MESSAGES}`, data);

export const addGroupMemberApi = (data: IAddMember): Promise<AxiosResponse> =>
  api.post(`${ChatEndpointsEnum.ADD_GROUP_MEMBER}`, data);
