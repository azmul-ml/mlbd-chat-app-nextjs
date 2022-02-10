import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ChatClient } from "@mlbd/chat-client";

import { tokenProvider, pusherOptions } from "../helpers/chat.helpers";
import { store } from "../../../redux/store";
import { onClientStablish } from "./onMessageRecieve";

let initialClient: any = null;

export const chatClient = createSlice({
  name: "chat/client",
  initialState: initialClient,
  reducers: {},
});

const handleSubscriptions = (client: any, dispatch: any) => {
  onClientStablish(client, dispatch);
};

export const exClientChat = (dispatch: any) => {
  initialClient = new ChatClient({
    chatApiEndpoint: "http://localhost:3001",
    tokenProvider,
    pusherOptions,
  });

  initialClient.connect().then(() => {
    handleSubscriptions(initialClient, dispatch);
    console.log(">>>>Stablished>>>>");
  });
};
