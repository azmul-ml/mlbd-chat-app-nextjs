import { useEffect, useRef, useState } from "react";
import { IMessageRecieve } from "../group/types/group-chat.types";
import cookie from "react-cookies";
import { AUTH_ACCESS_TOKEN } from "../../auth/constants/auth.keys";
import { useRouter } from "next/router";

import { getGroupMessages } from "../group/redux/get-group.massages.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { onMessageRecieveSlice } from "../redux/onMessageRecieve";

export const useGetMessages = (pageItems: number, setLoaderOn: any) => {
  const dispatch = useAppDispatch();
  const instantDeletedMessage = useAppSelector(
    (state) => state.onMessageDeleted.data
  );
  const instantText: IMessageRecieve | null = useAppSelector(
    (state: RootState) => state.onMessageRecieve.data
  );
  const currentGroup = useAppSelector(
    (state: RootState) => state.singleGroup.currentGroup
  );
  const [messageList, setMessageList] = useState<IMessageRecieve[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    pageItems > 10 && setLoaderOn(true);
    const token = cookie.load(AUTH_ACCESS_TOKEN);
    const data: any = {
      group_id: currentGroup?.id,
      token: token,
    };
    dispatch(getGroupMessages({ data, limit: pageItems })).then((res: any) => {
      if (res.payload) {
        const newMessages = [...res.payload];
        setMessageList(newMessages.reverse());
        setLoaderOn(false);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems, currentGroup, instantDeletedMessage]);

  useEffect(() => {
    const { resetOnMessageReceive } = onMessageRecieveSlice.actions;

    if (instantText) {
      setMessageList([...messageList, instantText]);
      dispatch(resetOnMessageReceive());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instantText]);

  return messageList;
};

// export const useSyncRealtimeMessage = (messageList: IMessageRecieve[]) => {
