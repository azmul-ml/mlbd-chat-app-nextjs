import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ChatClient } from "@mlbd/chat-client";

import { tokenProvider, pusherOptions } from "../helpers/chat.helpers";
import { store } from "../../../redux/store";
import { onMessageReceiveTunk } from "./onMessageRecieve";
import { onChatInitSlice } from "./chat.initialize.flag.slice";
import { IMessageRecieve } from "../group/types/group-chat.types";
import { onAddedToGroupThunk } from "./onAddedToGroup";
import { onUpdateGroupThunk } from "./onGroupUpdate";
import { onDeleteGroupThunk } from "./onDeleteGroup";
import { onGroupMemberAddedThunk } from "./onGroupMemberAdded";
import { onGroupMemberRemovedThunk } from "./onGroupMemberRemoved";
import { onMessageDeleteThunk } from "./onMessageDelete";

let initialClient: any = null;

export const chatClient = createSlice({
  name: "chat/client",
  initialState: initialClient,
  reducers: {},
});

const handleSubscriptions = (client: any, dispatch: any) => {
  client.onMessageRecieved((res: IMessageRecieve) => {
    dispatch(onMessageReceiveTunk(res));
  });
  client.onAddedToGroup((res: any) => {
    dispatch(onAddedToGroupThunk(res));
  });
  client.onGroupUpdated((res: any) => {
    dispatch(onUpdateGroupThunk(res));
  });
  client.onGroupDeleted((res: any) => {
    dispatch(onDeleteGroupThunk(res));
  });
  client.onGroupMemberAdded((res: any) => {
    dispatch(onGroupMemberAddedThunk(res));
  });
  client.onGroupMemberRemoved((res: any) => {
    dispatch(onGroupMemberRemovedThunk(res));
  });
  client.onMessageDeleted((res: any) => {
    dispatch(onMessageDeleteThunk(res));
  });
};

export const exClientChat = (dispatch: any) => {
  initialClient = new ChatClient({
    chatApiEndpoint: "http://localhost:3001",
    tokenProvider,
    pusherOptions,
  });

  initialClient.connect().then(() => {
    handleSubscriptions(initialClient, dispatch);
    dispatch(onChatInitSlice.actions.onChatInit());
    console.log(">>>>Stablished>>>>");
  });
};
