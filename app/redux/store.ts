import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/redux/auth.slice";
import userReducer from "../features/user/redux/user.slice";
import singleGroupReducer from "../features/chat/group/redux/get-single-group.slice";
import onMessageRecieveReducer from "../features/chat/redux/onMessageRecieve";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  singleGroup: singleGroupReducer,
  onMessageRecieve: onMessageRecieveReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
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
