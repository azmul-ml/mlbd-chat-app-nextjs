import React, { useEffect } from "react";
import { Button, Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import cookie from "react-cookies";
import { useRouter } from "next/router";

import { AppIcons } from "../../screens/AppICons";
import styles from "../../../../../styles/layout.module.scss";
import { ISentMessage } from "../types/group-chat.types";
import { AUTH_ACCESS_TOKEN } from "../../../auth/constants/auth.keys";
import { sendMessage } from "../redux/send-message.slice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import classNames from "classnames/bind";
import { RootState } from "../../../../redux/store";
import { useGetMessages, useSyncRealtimeMessage } from "../../helpers/hooks";
import MessageBlock from "./MessageBlock";
import { GroupTop } from "../../../../components/molecules/GroupTop";

export default function Chats({ allUsers }: { allUsers: any }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userData = useAppSelector((state: RootState) => state.auth.data);
  const messageList = useGetMessages();
  const syncMessages = useSyncRealtimeMessage(messageList);
  const [message, setMessage] = useState("");

  const cx = classNames.bind(styles);

  const token = cookie.load(AUTH_ACCESS_TOKEN);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };
  const handleSentMessage = () => {
    const data: ISentMessage = {
      group_id: router.query.roomId,
      message: message,
      token: token,
    };
    dispatch(sendMessage(data));
    setMessage("");
  };

  useEffect(() => {
    setMessage("");
  }, [router.query.roomId]);

  return (
    <>
      <GroupTop allUsers={allUsers} styles={styles} />
      <Row className={styles.chatWindow}>
        <MessageBlock
          messages={
            syncMessages?.length >= messageList?.length
              ? syncMessages
              : messageList
          }
          userData={userData}
          roomId={router.query.roomId}
        />
      </Row>
      <Row className={cx("chatComposePanel", "chBlock")}>
        <form>
          <Col className={styles.chatCompose}>
            <TextArea
              value={message}
              onChange={handleMessageChange}
              className={styles.textArea}
              rows={4}
            />
            <Button onClick={handleSentMessage}>Send</Button>
          </Col>
          <Col className={styles.chatComposeActions}>
            <Col className={styles.chatComposeActionsEditor}>
              Editor buttons
            </Col>
            <Col className={styles.chatComposeActionsAttachments}>
              <Button type="link" icon={AppIcons.LinkOutlined}></Button>

              <Button type="link" icon={AppIcons.LikeFilled}></Button>

              <Button type="link" icon={AppIcons.CameraFilled}></Button>

              <Button type="link" icon={AppIcons.UploadOutlined}></Button>
            </Col>
          </Col>
        </form>
      </Row>
    </>
  );
}
