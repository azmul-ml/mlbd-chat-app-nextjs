import React, { useState } from "react";
import { Row, Col } from "antd";

import styles from "../../../../styles/layout.module.scss";
import Chats from "../group/screens/Chats";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PageLeft } from "../../../components/pages/PageLeft";

export default function MainLayout({ children }: any) {
  const dispatch = useAppDispatch();

  const allUsers = useAppSelector((state) => state.user);

  const [fullScreen] = useState(false);

  return (
    <Row
      className={
        fullScreen
          ? styles.chatMain + " " + styles.chatMainFullscreen
          : styles.chatMain
      }
    >
      <PageLeft styles={styles} />

      <Col
        xs={24}
        sm={24}
        md={18}
        lg={18}
        xl={18}
        xxl={18}
        className={styles.chatRight}
      >
        <Chats allUsers={allUsers} />
      </Col>
    </Row>
  );
}
