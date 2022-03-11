import { Avatar, Button, Col, Popover, Row, Select } from "antd";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import qs, { ParseOptions, StringifyOptions } from "query-string";

import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { AUTH_ACCESS_TOKEN } from "../../features/auth/constants/auth.keys";

import {
  getSingleGroup,
  singleGroupSlice,
} from "../../features/chat/group/redux/get-single-group.slice";
import GroupDetailModal from "../../features/chat/group/screens/components/GroupDetailModal";
import Logout from "../../features/chat/group/screens/components/Logout";
import { IGroupResponse } from "../../features/chat/group/types/group-chat.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { AppIcons } from "../AppIcons";
import CustomModal from "./Modal";

const { Option } = Select;

export const GroupTop = ({
  styles,
  allUsers,
}: {
  styles: any;
  allUsers: any;
}) => {
  const [visibleProfile, setVisibleProfile] = useState(false);

  const [currentGroup, setCurrentGroup] = useState<IGroupResponse | null>(null);
  const dispatch = useAppDispatch();

  const token = cookie.load(AUTH_ACCESS_TOKEN);
  let router = useRouter();

  const handleVisibleChange = async () => {
    router.push({
      pathname: "",
      query: {
        roomId: router.query.roomId,
        modal: "groupDetail",
      },
    });
  };
  const handleVisibleChangeProfile = () => {
    setVisibleProfile(!visibleProfile);
  };

  const getCurrentGroup = async () => {
    const data = {
      group_id: router.query.roomId,
      token,
    };

    const res: any = await dispatch(getSingleGroup(data));
    setCurrentGroup(res.payload);
  };

  const closeModal = () => {
    router.push({
      pathname: "",
      query: {
        roomId: router.query.roomId,
      },
    });
  };
  useEffect(() => {
    getCurrentGroup();
  }, [router.query.roomId]);
  return (
    <Row className={styles.chatRightHeader}>
      <Col className={styles.chatRightHeaderTitle}>
        <Col className={styles.chatRightHeaderTitleText}>
          <label style={{ cursor: "pointer" }} onClick={handleVisibleChange}>
            {currentGroup?.meta.name}
          </label>
        </Col>
      </Col>

      <Col className={styles.chatRightHeaderAction}>
        <Button type="link" icon={AppIcons.SearchOutlined}></Button>
        <Button type="link" icon={AppIcons.PhoneFilled}></Button>

        <Button
          type="link"
          onClick={handleVisibleChange}
          icon={AppIcons.UserAddOutlined}
        ></Button>
        <Logout
          router={router}
          visibleProfile={visibleProfile}
          handleVisibleChangeProfile={handleVisibleChangeProfile}
        />
      </Col>
      {router.query.modal === "groupDetail" && (
        <GroupDetailModal
          isOpen={router.query.modal === "groupDetail"}
          onRequestClose={closeModal}
          groupDetail={currentGroup}
        ></GroupDetailModal>
      )}
    </Row>
  );
};
