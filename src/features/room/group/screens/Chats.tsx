import { Button, Col, Row } from "antd";
import { IMarkRead, ISentMessage } from "../types/group-chat.types";
import React, { memo, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { AUTH_ACCESS_TOKEN } from "../../../auth/constants/auth.keys";
import { AppIcons } from "../../screens/AppICons";
import { GroupTop } from "../../../../components/common/molecules/GroupTop";
import InitialGroupScreen from "./components/InitialGroupScreen";
import MessageBlock from "./MessageBlock";
import { RootState } from "../../../../redux/store";
import TextArea from "antd/lib/input/TextArea";
import classNames from "classnames/bind";
import cookie from "react-cookies";
import { markAsReadThunk } from "../redux/mark.as.read";
import { sendMessage } from "../redux/send-message.slice";
import styles from "../../../../../styles/layout.module.scss";
import { useGetMessages } from "../../helpers/hooks";
import { useRouter } from "next/router";
import { useState } from "react";

function Chats() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userData = useAppSelector((state: RootState) => state.auth.data);
  const [pageItems, setPageItems] = useState(10);
  const [loaderOn, setLoaderOn] = useState(false);
  const messageList = useGetMessages(pageItems, setLoaderOn);
  // const syncMessages = useSyncRealtimeMessage(messageList);
  const [message, setMessage] = useState("");
  const cx = classNames.bind(styles);

  const token = cookie.load(AUTH_ACCESS_TOKEN);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (router.query.roomId) {
      const data: IMarkRead = {
        token: token,
        group_id: router.query.roomId,
      };
      dispatch(markAsReadThunk(data));
    }
  }, [router.query.roomId]);

  const handlePageItem = useCallback((items: number) => {
    setPageItems(items);
  }, []);
  useEffect(() => {
    handlePageItem(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.roomId]);
  const handleSentMessage = () => {
    setMessage("");
    if (/\S/.test(message)) {
      const data: ISentMessage = {
        group_id: router.query.roomId,
        message: message,
        token: token,
      };
      dispatch(sendMessage(data));
    }
  };

  const onEnterPress = (e: any) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSentMessage();
    }
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={18}
      lg={18}
      xl={18}
      xxl={18}
      className={styles.chatRight}
    >
      <GroupTop />
      {router.query.roomId === "create-group" ? (
        <InitialGroupScreen />
      ) : (
        <>
          <Row className={styles.chatWindow}>
            <MessageBlock
              messages={messageList}
              userData={userData}
              roomId={router.query.roomId}
              handlePageItem={handlePageItem}
              pageItems={pageItems}
              loaderOn={loaderOn}
            />
          </Row>

          <Row className={cx("chatComposePanel", "chBlock")}>
            <form onSubmit={handleSentMessage} onKeyDown={onEnterPress}>
              <Col className={styles.chatCompose}>
                <TextArea
                  value={message}
                  onChange={handleMessageChange}
                  className={styles.textArea}
                  rows={4}
                  // onPressEnter={handleSentMessage}
                  autoSize={{ minRows: 1, maxRows: 6 }}
                />
                <Button onClick={handleSentMessage}>Send</Button>
              </Col>
              {/* <Col className={styles.chatComposeActions}>
            <Col className={styles.chatComposeActionsEditor}>
              Editor buttons
            </Col>
            <Col className={styles.chatComposeActionsAttachments}>
              <Button type="link" icon={AppIcons.LinkOutlined}></Button>

              <Button type="link" icon={AppIcons.LikeFilled}></Button>

              <Button type="link" icon={AppIcons.CameraFilled}></Button>

              <Button type="link" icon={AppIcons.UploadOutlined}></Button>
            </Col>
          </Col> */}
            </form>
          </Row>
        </>
      )}
    </Col>
  );
}
export default memo(Chats);
