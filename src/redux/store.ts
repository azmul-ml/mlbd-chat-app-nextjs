import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/redux/auth.slice";
import userReducer from "../features/user/redux/user.slice";
import singleGroupReducer from "../features/room/group/redux/get-single-group.slice";
import onMessageRecieveReducer from "../features/room/redux/onMessageRecieve";
import getGroupMessagesReducer from "../features/room/group/redux/get-group.massages.slice";
import onChatInitReducer from "../features/room/redux/chat.initialize.flag.slice";
import onAddedToGroupReducer from "../features/room/redux/onAddedToGroup";
import onGroupUpdateReducer from "../features/room/redux/onGroupUpdate";
import getGroupsReducer from "../features/room/group/redux/getMy-group";
import onGroupDeleteReduce from "../features/room/redux/onDeleteGroup";
import createGroupReducer from "../features/room/group/redux/create-group.slice";
import onGroupMemberAddedReducer from "../features/room/redux/onGroupMemberAdded";
import onGroupMemberRemovedReducer from "../features/room/redux/onGroupMemberRemoved";
import onMessageDeleteReduce from "../features/room/redux/onMessageDelete";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  singleGroup: singleGroupReducer,
  onMessageRecieve: onMessageRecieveReducer,
  groupMessages: getGroupMessagesReducer,
  chatInit: onChatInitReducer,
  onAddedToGroup: onAddedToGroupReducer,
  onGroupUpdate: onGroupUpdateReducer,
  onGroupDelete: onGroupDeleteReduce,
  groups: getGroupsReducer,
  groupCreation: createGroupReducer,
  onGroupMemberAdded: onGroupMemberAddedReducer,
  onGroupMemberRemoved: onGroupMemberRemovedReducer,
  onMessageDeleted: onMessageDeleteReduce,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "user"],
  blackList: ["chatInit"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
