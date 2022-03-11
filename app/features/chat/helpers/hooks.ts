import { useEffect, useState } from "react";
import { IMessageRecieve } from "../group/types/group-chat.types";
import cookie from "react-cookies";
import { AUTH_ACCESS_TOKEN } from "../../auth/constants/auth.keys";
import { useRouter } from "next/router";

import { getGroupMessages } from "../group/redux/get-group.massages.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { onMessageRecieveSlice } from "../redux/onMessageRecieve";

export const useGetMessages = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [messageList, setMessageList] = useState<IMessageRecieve[]>([]);
  const token = cookie.load(AUTH_ACCESS_TOKEN);

  useEffect(() => {
    const data: any = {
      group_id: router.query.roomId,
      token: token,
    };
    const { resetOnMessageReceive } = onMessageRecieveSlice.actions;
    dispatch(resetOnMessageReceive());
    dispatch(getGroupMessages(data)).then(
      (res: any) => res.payload && setMessageList([...res.payload])
    );
  }, [router.query.roomId, dispatch, token]);

  return messageList;
};

export const useSyncRealtimeMessage = (messageList: IMessageRecieve[]) => {
  const instantText: IMessageRecieve | null = useAppSelector(
    (state: RootState) => state.onMessageRecieve.data
  );
  const [syncMessages, setSyncMessages] =
    useState<IMessageRecieve[]>(messageList);
  const router = useRouter();

  useEffect(() => {
    setSyncMessages([]);
  }, [router.query.roomId]);

  useEffect(() => {
    if (messageList) {
      if (instantText) {
        setSyncMessages([...messageList, instantText]);
        messageList.push(instantText);
      }
    }
  }, [instantText, messageList]);
  return syncMessages;
};
