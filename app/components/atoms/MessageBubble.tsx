import { Button, Col, List, Row } from "antd";
import moment from "moment";
import React from "react";
import { IAllUserRecieved } from "../../features/user/type/user.types";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { AppIcons, msgActButtons } from "../AppIcons";

export default function MessageBubble({
  styles,
  message,
  userData,
}: {
  styles: any;
  message: any;
  userData: any;
}) {
  const users = useAppSelector((state: RootState) => state.user);

  const isMe = message.sender_id === userData?.user_id;
  const getSenderData = (senderId: string) =>
    users.filter((usr: IAllUserRecieved) => usr._id === senderId);

  return (
    <Col
      span={24}
      className={
        isMe
          ? styles.chatMessage + " " + styles.chatMessageReceiver
          : styles.chatMessage
      }
    >
      <Row className={styles.chatMessageName}>
        {isMe ? "You" : getSenderData(message.sender_id)[0]?.name}
        <Col className={styles.chatMessageTime}>
          <span>{moment(message.sent_at).format("h:m:s")}</span>
          <span>{moment(message.sent_at).format("MMMM Do YYYY")}</span>
        </Col>
      </Row>

      <Row className={styles.chatMessageTextPanel}>
        <Col className={styles.chatMessageText}>{message.message}</Col>

        <Col className={styles.chatMessageAction}>
          {AppIcons.MoreOutlined}

          <List
            className={styles.chatMessageActionItems}
            dataSource={msgActButtons}
            renderItem={(item: any) => (
              <List.Item>
                <Button type="link" icon={item.ico}></Button>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Col>
  );
}
