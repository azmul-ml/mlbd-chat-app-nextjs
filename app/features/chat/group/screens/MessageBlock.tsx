import styles from "../../../../../styles/layout.module.scss";

import { IMessageRecieve } from "../types/group-chat.types";
import { ILoggedInUse } from "../../../auth/types/auth.types";

import MessageBubble from "../../../../components/atoms/MessageBubble";
import { useEffect, useRef } from "react";

interface IMessageBLock {
  messages: IMessageRecieve[];
  userData: ILoggedInUse;
}

export default function MessageBlock({ messages, userData }: IMessageBLock) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);
  return (
    <div style={{ width: "100%" }}>
      {messages.length > 1 &&
        messages?.map((message: IMessageRecieve) => (
          <MessageBubble
            key={`${message.id}-${message.message}`}
            styles={styles}
            message={message}
            userData={userData}
          />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
