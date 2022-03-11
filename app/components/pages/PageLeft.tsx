import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Button, Col, List, Row } from "antd";
import Title from "antd/lib/typography/Title";
import classNames from "classnames/bind";
import cookie from "react-cookies";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppIcons } from "../AppIcons";

import { AUTH_ACCESS_TOKEN } from "../../features/auth/constants/auth.keys";
import { useRouter } from "next/router";
import { getMyGroup } from "../../features/chat/group/redux/getMy-group";
import Modal from "../../features/chat/group/screens/components/CreateGroupModal";
import { exClientChat } from "../../features/chat/redux/chat-client.slice";
import { RootState } from "../../redux/store";

export const PageLeft = ({ styles }: { styles: any }) => {
  const [myGroups, setMyGroups] = useState([]) as any;
  const [modalIsOpen, setIsOpen] = useState(false);

  const userData: any = useAppSelector((state) => state.auth.data);
  const chatInit = useAppSelector((state) => state.chatInit);
  const instantGroup = useAppSelector(
    (state: RootState) => state.onAddedToGroup.data
  );
  let router = useRouter();
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const currentGroupId = router.query.roomId;

  const handleGroupLink = (id: string) => {
    router.push(
      {
        pathname: "",
        query: {
          roomId: id,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const getGroups = useCallback(async () => {
    const token = cookie.load(AUTH_ACCESS_TOKEN);
    const data: any = {
      token,
    };
    const res: any = await dispatch(getMyGroup(data));
    const groups = res.payload?.filter((d: any) => d.meta !== null);
    setMyGroups(groups);
  }, [dispatch]);

  useEffect(() => {
    if (instantGroup) {
      setMyGroups([...myGroups, instantGroup]);
    }
  }, [instantGroup]);

  useEffect(() => {
    router.push(
      {
        pathname: "",
        query: {
          roomId: myGroups[0]?.id,
        },
      },
      undefined,
      { shallow: true }
    );
  }, [myGroups]);

  useEffect(() => {
    if (!chatInit.data) {
      exClientChat(dispatch);
    }
  }, [chatInit.data, dispatch]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Col xs={0} sm={0} md={6} lg={6} xl={6} xxl={6} className={styles.chatLeft}>
      <Row className={styles.chatLeftHeader}>
        <Avatar size={50} icon="user" className={styles.chatLeftAvatar} />
        <Title
          level={4}
          style={{ marginTop: "10px" }}
          className={styles.chatLeftTitle}
        >
          {userData?.name?.charAt(0).toUpperCase() + userData.name?.slice(1)}
        </Title>
        <Col className={styles.chatLeftName}></Col>
      </Row>

      <Row className={cx("chatLeftDetails", "chBlock")}>
        <Row
          className={
            styles.chatLeftDetailsHeader +
            " " +
            styles.chatLeftDetailsHeaderLink
          }
        >
          <div>
            <a>
              {AppIcons.CaretDownOutlined}
              <span className={styles.chatLeftDetailsHeaderText}>Groups</span>
              <Button
                type="link"
                icon={AppIcons.PlusOutlined}
                onClick={() => openModal()}
              ></Button>
            </a>
          </div>
        </Row>

        <Row className={styles.chatGroupList}>
          <List
            grid={{ column: 1, xs: 1 }}
            dataSource={myGroups}
            renderItem={(item: any) => (
              <List.Item className={styles.groupList}>
                <div
                  className={`${styles.groupSelect} ${
                    currentGroupId === item.id ? styles.groupSelectSelected : ""
                  }`}
                >
                  <span
                    style={{ marginLeft: "20px", cursor: "pointer" }}
                    onClick={() => handleGroupLink(item.id)}
                  >
                    {item.meta.name}
                  </span>
                  <span className={styles.chatMessageCount}>
                    {item.members?.length}
                  </span>
                </div>
              </List.Item>
            )}
          />
        </Row>
        {modalIsOpen && (
          <Modal
            style={styles}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            handleGroupModal={setIsOpen}
          />
        )}
      </Row>
    </Col>
  );
};
