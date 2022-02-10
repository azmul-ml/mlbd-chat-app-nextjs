import React, { useState } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { Row, Col, Select } from "antd";

import styles from "../../../../styles/layout.module.scss";
import Modal from "../group/screens/Modal";
import Chats from "../group/screens/Chats";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PageLeft } from "../../../components/pages/PageLeft";

export default function MainLayout({ children }: any) {
  const dispatch = useAppDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [groupItem] = useState([]) as any;

  const allUsers = useAppSelector((state) => state.user);
  const cx = classNames.bind(styles);

  const [fullScreen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Row
      className={
        fullScreen
          ? styles.chatMain + " " + styles.chatMainFullscreen
          : styles.chatMain
      }
    >
      {console.log(groupItem)}
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

        <Modal
          style={styles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          handleGroupModal={setIsOpen}
        />
      </Col>
    </Row>
  );
}
