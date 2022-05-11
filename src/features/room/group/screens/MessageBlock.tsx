import { useCallback, useEffect, useRef, useState, memo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "../../../../../styles/layout.module.scss";

import { IMessageRecieve } from "../types/group-chat.types";
import { ILoggedInUse } from "../../../auth/types/auth.types";

import MessageBubble from "../../../../components/common/atoms/MessageBubble";
import moment from "moment";
import { formatDate } from "../helpers/message.block.helpers";
import { useRouter } from "next/router";
import { Spin } from "antd";

interface IMessageBLock {
  messages: IMessageRecieve[];
  userData: ILoggedInUse;
  roomId: string | string[] | undefined;
  handlePageItem: (items: number) => void;
  pageItems: number;
  loaderOn: boolean;
}

function MessageBlock({
  messages,
  userData,
  roomId,
  handlePageItem,
  pageItems,
  loaderOn,
}: IMessageBLock) {
  const router = useRouter();
  const [dates, setDates] = useState<any>([]);
  const [devidedMessageByDate, setDevidedMessageByDate] = useState([]);
  const messageEnd = useRef<any>(null);
  // const loader = useRef(null);

  const observer = useRef<null | IntersectionObserver>(null);
  const lastChildMessageObserver = useRef<null | IntersectionObserver>(null);
  const [initiallyPageLoaded, setInitiallyPageLoaded] = useState(false);
  const [firstElement, setFirstElement] = useState(false);

  const LastMessageRef = useCallback((node) => {
    if (lastChildMessageObserver.current)
      lastChildMessageObserver.current.disconnect();
    lastChildMessageObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setInitiallyPageLoaded(true);
      }
    });
    if (node) lastChildMessageObserver.current.observe(node);
  }, []);
  const firstMessageRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      setFirstElement(entries[0].isIntersecting);
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    setInitiallyPageLoaded(false);
  }, [router.query.roomId]);

  useEffect(() => {
    messageEnd?.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (initiallyPageLoaded && firstElement) {
      handlePageItem(pageItems + 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiallyPageLoaded, firstElement]);

  useEffect(() => {
    messages.map((msg: any) => {
      const currentDate = moment(msg.sent_at).format("MMM Do YY");
      if (!dates.includes(currentDate)) {
        dates.push(currentDate);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const newMessages = dates
      .map((date: any) =>
        messages.filter(
          (msg) => moment(msg.sent_at).format("MMM Do YY") === date
        )
      )
      .filter((msg: any) => msg.length > 0);
    setDevidedMessageByDate(newMessages);
  }, [messages, dates]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {loaderOn && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      <div ref={firstMessageRef}></div>

      {messages?.length > 0 &&
        messages?.map((message: IMessageRecieve, index: any) => (
          <div key={message.id}>
            <div className={styles.chatDateDecoration}>
              {formatDate(message.sent_at, messages[index - 1]?.sent_at)}
            </div>
            {messages.length === index + 1 && <div ref={LastMessageRef}></div>}
            {roomId === message.group_id && (
              <MessageBubble
                key={`${message.id}-${message.message}`}
                styles={styles}
                message={message}
                userData={userData}
              />
            )}
          </div>
        ))}

      <div ref={messageEnd}></div>
    </div>
  );
}
export default memo(MessageBlock);
