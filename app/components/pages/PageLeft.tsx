import { Avatar, Button, Col, List, Row } from "antd";
import Title from "antd/lib/typography/Title";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";
import cookie from "react-cookies";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { AppIcons } from "../AppIcons";
import {
  getSingleGroup,
  singleGroupSlice,
} from "../../features/chat/group/redux/get-single-group.slice";
import { AUTH_ACCESS_TOKEN } from "../../features/auth/constants/auth.keys";
import { useRouter } from "next/router";
import { getMyGroup } from "../../features/chat/group/redux/getMy-group";
import { Collapsible } from "../atoms/Collapsible";
import { getGroupMessages } from "../../features/chat/group/redux/get-group.massages.slice";

export const PageLeft = ({ styles }: { styles: any }) => {
  const [myGroups, setMyGroups] = useState([]) as any;
  const [modalIsOpen, setIsOpen] = useState(false);
  const userData: any = useAppSelector((state) => state.auth.data);

  let router = useRouter();
  const dispatch = useAppDispatch();

  const cx = classNames.bind(styles);

  const handleGroupLink = async (id: string) => {
    const { addSingleGroup } = singleGroupSlice.actions;
    const token = cookie.load(AUTH_ACCESS_TOKEN);
    const data = {
      group_id: id,
      token,
    };
    const res = await dispatch(getSingleGroup(data));
    await dispatch(addSingleGroup(res.payload));
    // await setGroupItem(res.payload);
    res.payload && router.push(`/room/${id}`);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
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
    getGroups();
  }, [getGroups]);

  useEffect(() => {
    if (!router.query.roomId && myGroups[0]) {
      console.log(router.query.roomId);
      router.push(`/room/${myGroups[0]?.id}`);
    }
  }, [router.query.roomId, myGroups[0]]);

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
        <Col className={styles.chatLeftName}>
          {/* <Col span={24} className={styles.chatStatus}>
            <span
              className={styles.chatStatusDot + " " + styles.chatStatusDotBusy}
            ></span>
            <span className={styles.chatStatusText}>
              Busy
              {AppIcons.CaretDownOutlined}
            </span>
          </Col> */}
        </Col>
      </Row>

      <Row className={cx("chatLeftDetails", "chBlock")}>
        {/* <Row
          className={
            styles.chatLeftDetailsHeader +
            " " +
            styles.chatLeftDetailsHeaderLink
          }
        >
          <Link href="/">
            <a>
              {AppIcons.MessageOutlined}
              <span className={styles.chatLeftDetailsHeaderText}>Threads</span>
            </a>
          </Link>
        </Row>

        <Row
          className={
            styles.chatLeftDetailsHeader +
            " " +
            styles.chatLeftDetailsHeaderLink
          }
        >
          <Link href="/">
            <a>
              {AppIcons.EditOutlined}
              <span className={styles.chatLeftDetailsHeaderText}>Draft</span>
            </a>
          </Link>
        </Row> */}

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
            dataSource={myGroups}
            renderItem={(item: any) => (
              <List.Item>
                <div>
                  <span
                    style={{ marginLeft: "20px", cursor: "pointer" }}
                    onClick={() => handleGroupLink(item.id)}
                  >
                    {item.meta.name}
                  </span>
                  <span className={styles.chatMessageCount}>
                    {myGroups.length}
                  </span>
                </div>
              </List.Item>
            )}
          />
        </Row>
      </Row>
    </Col>
  );
};
