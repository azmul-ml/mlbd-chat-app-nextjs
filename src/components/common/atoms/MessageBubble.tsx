import { Button, Col, Input, List, Row } from "antd";
import cookie from "react-cookies";
import moment from "moment";
import React from "react";
import { IAllUserRecieved } from "../../../features/user/type/user.types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { AppIcons, msgActButtons } from "../../AppIcons";
import { AUTH_ACCESS_TOKEN } from "../../../features/auth/constants/auth.keys";
import { IDeleteMessage } from "../../../features/room/group/types/group-chat.types";
import { deleteMessage } from "../../../features/room/group/redux/delete.message";
import Image from "next/image";

const myLoader = ({ src, width, quality }: any) => {
  // console.log(src, width, quality);
  return `${src}?w=${width}&q=${quality || 75}`;
};

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
    users.find((usr: IAllUserRecieved) => usr._id === senderId);

  const dispatch = useAppDispatch();

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
        {isMe ? "You" : getSenderData(message.sender_id)?.name}
        <Col className={styles.chatMessageTime}>
          <span>{moment(message.sent_at).format("h:m:s")}</span>
        </Col>
      </Row>

      <Row className={styles.chatMessageTextPanel}>
        {message.message.length > 0 && (
          <Col className={styles.chatMessageText}>
            {message.message}
            {/* <Input /> */}
          </Col>
        )}
        {message.attachments.length > 0 && (
          <Col className={styles.chatMessageText}>
            <Image
              loader={myLoader}
              src={message.attachments[0].url}
              alt="Picture of the author"
              width={50}
              height={50}
            />
          </Col>
        )}

        <Col className={styles.chatMessageAction}>
          {AppIcons.MoreOutlined}

          <List className={styles.chatMessageActionItems}>
            <List.Item>
              {/* {console.log(item)} */}
              {/* <Button
                type="link"
                icon={msgActButtons[1].ico}
                size="small"
                onClick={() => setEdit(true)}
              ></Button> */}
              {/* <Button
                type="link"
                size="small"
                icon={msgActButtons[2].ico}
              ></Button> */}
              <Button
                size="small"
                type="link"
                onClick={() => {
                  const data: IDeleteMessage = {
                    token: cookie.load(AUTH_ACCESS_TOKEN),
                    message_id: message.id,
                  };
                  dispatch(deleteMessage(data));
                }}
                icon={msgActButtons[0].ico}
              ></Button>
            </List.Item>
          </List>
        </Col>
      </Row>
    </Col>
  );
}
