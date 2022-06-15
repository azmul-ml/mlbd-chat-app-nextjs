import { AppIcons, msgActButtons } from "../../AppIcons";
import { Button, Col, Input, List, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { AUTH_ACCESS_TOKEN } from "../../../features/auth/constants/auth.keys";
import { IAllUserRecieved } from "../../../features/user/type/user.types";
import { IDeleteMessage } from "../../../features/room/group/types/group-chat.types";
import Image from "next/image";
import React from "react";
import { RootState } from "../../../redux/store";
import { Skeleton } from "antd";
import cookie from "react-cookies";
import { deleteMessage } from "../../../features/room/group/redux/delete.message";
import moment from "moment";

const myLoader = ({ src, width, quality }: any) => {
  // console.log(src, width, quality);
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function MessageBubble({
  styles,
  message,
  userData,
  imageLoading,
}: {
  styles: any;
  message: any;
  userData: any;
  imageLoading: boolean;
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
      <Row className={styles.chatMessageHeader}>
        <Col className={styles.chatMessageName}>
          <span>{getSenderData(message.sender_id)?.name!}&nbsp;·&nbsp;</span>
        </Col>
        <Col className={styles.chatMessageTime}>
          <span>{moment(message.sent_at).format("hh:mm a")}</span>
        </Col>
      </Row>

      <Row className={styles.chatMessageTextPanel}>
        {message.message.length > 0 && (
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
        )}
        {message.attachments.length > 0 && (
          <Col
            className={`${styles.chatMessageImage} ${styles.chatMessageTextPanel}`}
          >
            <div className={styles.chatMessageAttachmentPanelImageBlock}>
              <Image
                src={
                  getSenderData(message.sender_id)
                    ? getSenderData(message.sender_id)?.profile_image_link!
                    : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                }
                width={36}
                height={36}
                alt="pro-pic"
                className={styles.chatMessageProPic}
              />
              <Col className={styles.chatMessageAttachment}>
                <Image
                  loader={myLoader}
                  src={message.attachments[0].url}
                  alt="Picture of the author"
                  placeholder="blur"
                  blurDataURL="message.attachments[0].url"
                  height={200}
                  width={250}
                  objectFit="contain"
                />
              </Col>
            </div>
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
