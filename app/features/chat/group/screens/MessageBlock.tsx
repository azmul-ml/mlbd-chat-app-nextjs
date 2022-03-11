import styles from "../../../../../styles/layout.module.scss";

import { IMessageRecieve } from "../types/group-chat.types";
import { ILoggedInUse } from "../../../auth/types/auth.types";

import MessageBubble from "../../../../components/atoms/MessageBubble";
import { useEffect, useRef } from "react";

interface IMessageBLock {
  messages: IMessageRecieve[];
  userData: ILoggedInUse;
  roomId: string | string[] | undefined;
}

export default function MessageBlock({
  messages,
  userData,
  roomId,
}: IMessageBLock) {
  let messageEnd: any = null;

  useEffect(() => {
    messageEnd.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div style={{ width: "100%" }}>
      {messages.length > 0 &&
        messages?.map(
          (message: IMessageRecieve) =>
            roomId === message.group_id && (
              <MessageBubble
                key={`${message.id}-${message.message}`}
                styles={styles}
                message={message}
                userData={userData}
              />
            )
        )}
      <div
        ref={(element) => {
          messageEnd = element;
        }}
      ></div>
    </div>
  );
}
