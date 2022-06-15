import { Col, List, Row, Skeleton } from "antd";
import { FormOutlined, UserOutlined } from "@ant-design/icons";
import React, { memo, useCallback, useEffect, useState } from "react";
import { differenceInDays, format } from "date-fns";
import {
  getMyGroup,
  getMyGroupsSlice,
} from "../../../features/room/group/redux/getMy-group";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { AUTH_ACCESS_TOKEN } from "../../../features/auth/constants/auth.keys";
import { IGroupResponse } from "../../../features/room/group/types/group-chat.types";
import Image from "next/image";
import Link from "next/link";
import Modal from "../../../features/room/group/screens/components/CreateGroupModal";
import { RootState } from "../../../redux/store";
import Title from "antd/lib/typography/Title";
import classNames from "classnames/bind";
import cookie from "react-cookies";
import { createGroupSlice } from "../../../features/room/group/redux/create-group.slice";
import { exClientChat } from "../../../features/room/redux/chat-client.slice";
import { onMessageRecieveSlice } from "../../../features/room/redux/onMessageRecieve";
import styles from "../../../../styles/layout.module.scss";
import { useRouter } from "next/router";

const PageLeft = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const groups = useAppSelector((state) => state.groups.data);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const userData: any = useAppSelector((state) => state.auth.data);
  const chatInit = useAppSelector((state) => state.chatInit);
  const instantGroup = useAppSelector(
    (state: RootState) => state.onAddedToGroup.data
  );
  const instantMessage = useAppSelector(
    (state) => state.onMessageRecieve.stateForGroupDot
  );
  const instantGroupUpdate = useAppSelector(
    (state) => state.onGroupUpdate.data
  );
  const instantGroupDelete = useAppSelector(
    (state) => state.onGroupDelete.data
  );
  const openGroupModal = useAppSelector(
    (state) => state.groupCreation.openGroupModal
  );
  let router = useRouter();
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const currentGroupId = router.query.roomId;
  const { updateGroupArray } = getMyGroupsSlice.actions;
  const { triggerGroupModal } = createGroupSlice.actions;

  const handleGroupLink = (id: string) => {
    const { onGroupClickGroup } = onMessageRecieveSlice.actions;
    const updatedMessageList = instantMessage.filter(
      (msg: any) => msg.group_id !== id
    );
    dispatch(onGroupClickGroup(updatedMessageList));
  };

  const getGroups = useCallback(async () => {
    const token = cookie.load(AUTH_ACCESS_TOKEN);
    const data: any = {
      token,
    };
    await dispatch(getMyGroup(data));
  }, [dispatch]);

  useEffect(() => {
    /*
     ** When Added to new group event fires the new group will be added to
     ** the group array
     */
    if (instantGroup && groups) {
      dispatch(updateGroupArray([...groups, instantGroup]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instantGroup]);

  useEffect(() => {
    /*
     ** When group update event fires the updated group will be added to the
     ** group array
     */
    if (instantGroupUpdate && groups) {
      const changedGroupIndex = groups.findIndex(
        (group: IGroupResponse) => group.id === instantGroupUpdate.id
      );
      let updatedGroup = [...groups];
      console.log(instantGroupUpdate, groups);
      updatedGroup[changedGroupIndex] = instantGroupUpdate;
      dispatch(updateGroupArray(updatedGroup));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instantGroupUpdate]);

  useEffect(() => {
    /*
     ** When group delete event fires the deleted group will be filtered from the
     ** group array
     */
    if (instantGroupDelete && groups) {
      const updatedGroup = groups.filter(
        (group: IGroupResponse) => group.id !== instantGroupDelete.id
      );

      dispatch(updateGroupArray(updatedGroup));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instantGroupDelete]);

  useEffect(() => {
    /*
     ** Initialize the channel only once
     */
    if (!chatInit.data) {
      exClientChat(dispatch);
    }
  }, [chatInit.data, dispatch]);

  useEffect(() => {
    chatInit && getGroups();
  }, [getGroups, chatInit]);

  const closeModal = () => {
    setIsOpen(false);
    dispatch(triggerGroupModal(false));
  };

  const openModal = () => {
    setIsOpen(true);
    dispatch(triggerGroupModal(true));
  };

  // useEffect(() => {
  //   if (openGroupModal) {
  //     setIsOpen(true);
  //   }
  // }, [openGroupModal]);

  const formatDate = (date: string) => {
    const duration = differenceInDays(new Date(date), new Date());

    let lastDateMessageAt;

    if (duration > 0) {
      lastDateMessageAt = format(new Date(date), "dd/MM/yyyy");
    } else {
      lastDateMessageAt = format(new Date(date), "hh:mm a");
    }

    return lastDateMessageAt;
  };

  return (
    <Col xs={0} sm={0} md={6} lg={6} xl={6} xxl={6} className={styles.chatLeft}>
      <Row className={styles.chatLeftHeader}>
        {userData.profile_image_link ? (
          <div className={styles.chatLeftProPicContainer}>
            <Image
              src={userData.profile_image_link}
              width={50}
              height={50}
              alt="pro-pic"
              className={styles.chatLeftProPic}
            />
          </div>
        ) : (
          <UserOutlined className={styles.chatLeftAvatar} />
        )}

        <Title level={4} className={styles.chatLeftTitle}>
          {userData?.name?.charAt(0).toUpperCase() + userData.name?.slice(1)}
        </Title>
        <FormOutlined
          className={styles.chatLeftCreateIcon}
          onClick={() => openModal()}
        />
      </Row>

      <Row>
        <Row style={{ width: "100%" }}>
          {groups?.length === 0 ? (
            <h2
              style={{
                color: "#4d504f",
                margin: "5px 0 0 15px ",
              }}
            >
              Please Create a Room
            </h2>
          ) : (
            <div className={styles.chatGroupList}>
              <List
                grid={{ column: 1, xs: 1 }}
                dataSource={groups}
                renderItem={(item: IGroupResponse) => {
                  return (
                    <Skeleton loading={loadingGroups} active>
                      <List.Item className={styles.groupList}>
                        <Link href={`/room/${item.id}`}>
                          <a onClick={() => handleGroupLink(item.id)}>
                            <div
                              className={`${styles.groupSelect} ${
                                currentGroupId === item.id
                                  ? styles.groupSelectSelected
                                  : ""
                              }`}
                            >
                              <div className={styles.groupInfo}>
                                <div>
                                  <h3>{item.meta.name}</h3>
                                  <p>
                                    {item.last_message &&
                                    item.last_message.message
                                      ? item.last_message.message
                                      : item.last_message?.attachments.length
                                      ? "📎 Attachment"
                                      : "New Group Created"}
                                  </p>
                                </div>
                                <div>
                                  {item.last_message
                                    ? formatDate(item.last_message.sent_at)
                                    : formatDate(item.last_message_at)}

                                  <div style={{ textAlign: "end" }}>
                                    {instantMessage?.some(
                                      (msg: any) =>
                                        msg.group_id === item.id &&
                                        userData.user_id !== msg.sender_id
                                    ) &&
                                      currentGroupId !== item.id && (
                                        <span
                                          className={styles.chatMessageCount}
                                        ></span>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </List.Item>
                    </Skeleton>
                  );
                }}
              />
            </div>
          )}
        </Row>
        {(openGroupModal || modalIsOpen) && (
          <Modal
            style={styles}
            isOpen={openGroupModal}
            onRequestClose={closeModal}
            handleGroupModal={triggerGroupModal}
          />
        )}
      </Row>
    </Col>
  );
};

export default memo(PageLeft);
