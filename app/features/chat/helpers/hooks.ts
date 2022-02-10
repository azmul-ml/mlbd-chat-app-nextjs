import { useEffect, useState } from "react";
import {
  IGetSingleGroup,
  IMessageRecieve,
  ISignleGroup,
} from "../group/types/group-chat.types";
import cookie from "react-cookies";
import { AUTH_ACCESS_TOKEN } from "../../auth/constants/auth.keys";
import { useRouter } from "next/router";

import { getGroupMessages } from "../group/redux/get-group.massages.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

export const useGetMessages = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [messageList, setMessageList] = useState<IMessageRecieve[]>([]);
  const url = window.location.pathname.split("/").pop();
  const token = cookie.load(AUTH_ACCESS_TOKEN);

  const data: any = {
    group_id: router.query.roomId,
    token: token,
  };
  useEffect(() => {
    dispatch(getGroupMessages(data)).then(
      (res: any) => res.payload && setMessageList([...res.payload].reverse())
    );
  }, [url]);

  return messageList;
};

export const useSyncRealtipeMessage = (messageList: IMessageRecieve[]) => {
  const instantText: IMessageRecieve | null = useAppSelector(
    (state: RootState) => state.onMessageRecieve.data
  );
  const [syncMessages, setSyncMessages] =
    useState<IMessageRecieve[]>(messageList);

  useEffect(() => {
    if (messageList) {
      if (instantText) {
        setSyncMessages([instantText, ...messageList].reverse());
        messageList.push(instantText);
      }
    }
  }, [instantText]);
  return syncMessages;
};
