import { AppIcons, msgActButtons } from "../../AppIcons";
import { Button, Col, Input, List, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { AUTH_ACCESS_TOKEN } from "../../../features/auth/constants/auth.keys";
import { IAllUserRecieved } from "../../../features/user/type/user.types";
import { IDeleteMessage } from "../../../features/room/group/types/group-chat.types";
import Image from "next/image";
import React from "react";
import { RootState } from "../../../redux/store";
import cookie from "react-cookies";
import { deleteMessage } from "../../../features/room/group/redux/delete.message";
import moment from "moment";

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

  console.log(message);
  console.log(getSenderData(message.sender_id)?.profile_image_link);
  return (
    <Col
      span={24}
      className={
        isMe
          ? styles.chatMessage + " " + styles.chatMessageReceiver
          : styles.chatMessage
      }
    >
      <Row className={styles.chatMessageHeader}>
        <Col className={styles.chatMessageName}>
          <span>{getSenderData(message.sender_id)?.name!}&nbsp;·&nbsp;</span>
        </Col>
        <Col className={styles.chatMessageTime}>
          <span>{moment(message.sent_at).format("hh:mm a")}</span>
        </Col>
      </Row>

      <Row className={styles.chatMessageTextPanel}>
        <div className={styles.chatMessageTextPanelImageBlock}>
          <Image
            src={getSenderData(message.sender_id)?.profile_image_link!}
            width={36}
            height={36}
            alt="pro-pic"
            className={styles.chatMessageProPic}
          />
          <Col className={styles.chatMessageText}>
            {message.message}
            {/* <Input /> */}
          </Col>
        </div>

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
