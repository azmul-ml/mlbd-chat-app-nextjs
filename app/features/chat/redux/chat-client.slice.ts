import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ChatClient } from "@mlbd/chat-client";

import { tokenProvider, pusherOptions } from "../helpers/chat.helpers";
import { store } from "../../../redux/store";
import { onMessageReceiveTunk } from "./onMessageRecieve";
import { onChatInitSlice } from "./chat.initialize.flag.slice";
import { IMessageRecieve } from "../group/types/group-chat.types";
import { onAddedToGroupThunk } from "./onAddedToGroup";

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
