import React, { useCallback, useEffect, useState, memo } from "react";
import {
  Avatar,
  Button,
  Col,
  Divider,
  List,
  Row,
  Skeleton,
  Tooltip,
} from "antd";
import Title from "antd/lib/typography/Title";
import classNames from "classnames/bind";
import cookie from "react-cookies";
import { UserOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AppIcons } from "../../AppIcons";

import { AUTH_ACCESS_TOKEN } from "../../../features/auth/constants/auth.keys";
import { useRouter } from "next/router";
import {
  getMyGroup,
  getMyGroupsSlice,
} from "../../../features/room/group/redux/getMy-group";
import Modal from "../../../features/room/group/screens/components/CreateGroupModal";
import { exClientChat } from "../../../features/room/redux/chat-client.slice";
import { RootState } from "../../../redux/store";
import Item from "antd/lib/list/Item";
import { onMessageRecieveSlice } from "../../../features/room/redux/onMessageRecieve";
import Link from "next/link";
import styles from "../../../../styles/layout.module.scss";
import { IGroupResponse } from "../../../features/room/group/types/group-chat.types";
import { createGroupSlice } from "../../../features/room/group/redux/create-group.slice";

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

  return (
    <Col xs={0} sm={0} md={6} lg={6} xl={6} xxl={6} className={styles.chatLeft}>
      <Row className={styles.chatLeftHeader}>
        <UserOutlined className={styles.chatLeftAvatar} />
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
              {/* {AppIcons.CaretDownOutlined} */}
              <span className={styles.chatLeftDetailsHeaderText}>Rooms</span>
              <Tooltip title="Create Room" placement="right">
                <Button
                  type="link"
                  icon={AppIcons.PlusOutlined}
                  onClick={() => openModal()}
                ></Button>
              </Tooltip>
            </a>
          </div>
        </Row>

        <Row>
          {groups?.length === 0 ? (
            <div style={{ color: "white", margin: "5px 0 0 10px " }}>
              Please Create a Room
            </div>
          ) : (
            <div style={{ width: "100%" }} className={styles.chatGroupList}>
              <List
                grid={{ column: 1, xs: 1 }}
                dataSource={groups}
                renderItem={(item: IGroupResponse) => (
                  <Skeleton loading={loadingGroups} active>
                    <List.Item className={styles.groupList}>
                      <div
                        className={`${styles.groupSelect} ${
                          currentGroupId === item.id
                            ? styles.groupSelectSelected
                            : ""
                        }`}
                      >
                        <Link href={`/room/${item.id}`}>
                          <a
                            onClick={() => handleGroupLink(item.id)}
                            className={`${styles.groupSelect} ${
                              currentGroupId === item.id
                                ? styles.groupSelectSelected
                                : ""
                            }`}
                            style={{ marginLeft: "20px", cursor: "pointer" }}
                          >
                            {item.meta.name}
                          </a>
                        </Link>
                        {instantMessage?.some(
                          (msg: any) =>
                            msg.group_id === item.id &&
                            userData.user_id !== msg.sender_id
                        ) &&
                          currentGroupId !== item.id && (
                            <span className={styles.chatMessageCount}></span>
                          )}
                      </div>
                    </List.Item>
                  </Skeleton>
                )}
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
