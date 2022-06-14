import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { AUTH_ACCESS_TOKEN } from "../../../features/auth/constants/auth.keys";
import { AppIcons } from "../../AppIcons";
import GroupDetailModal from "../../../features/room/group/screens/components/GroupDetailModal";
import { IGroupResponse } from "../../../features/room/group/types/group-chat.types";
import Logout from "../../../features/room/group/screens/components/Logout";
import { ModalTab } from "../../../features/room/group/constants/modal.enum";
import cookie from "react-cookies";
import { getSingleGroup } from "../../../features/room/group/redux/get-single-group.slice";
import styles from "../../../../styles/layout.module.scss";
import { useRouter } from "next/router";

export const GroupTop = () => {
  const [visibleProfile, setVisibleProfile] = useState(false);
  const dispatch = useAppDispatch();
  const currentGroup = useAppSelector(
    (state) => state.singleGroup.currentGroup
  );
  const instantUpdatedGroup = useAppSelector(
    (state) => state.onGroupUpdate.data
  );

  const token = cookie.load(AUTH_ACCESS_TOKEN);
  let router = useRouter();

  const handleVisibleChange = async (tab: string) => {
    router.push({
      pathname: `/room/${currentGroup?.id}`,
      query: {
        edit: "groupDetail",
        tab: `${tab}`,
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

    await dispatch(getSingleGroup(data));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.roomId]);
  return (
    <Row className={styles.chatRightHeader}>
      <Col className={styles.chatRightHeaderTitle}>
        <Col className={styles.chatRightHeaderTitleText}>
          <label
            style={{ cursor: "pointer" }}
            onClick={() => handleVisibleChange("about")}
          >
            {/* {console.log(currentGroup)} */}
            {!instantUpdatedGroup && currentGroup?.meta.name}
            {instantUpdatedGroup && instantUpdatedGroup?.meta.name}
          </label>
        </Col>
      </Col>

      <Col className={styles.chatRightHeaderAction}>
        {/* <Button type="link" icon={AppIcons.SearchOutlined}></Button> */}
        {/* <Button type="link" icon={AppIcons.PhoneFilled}></Button> */}

        {currentGroup && (
          <Button
            type="link"
            onClick={() => handleVisibleChange("members")}
            icon={AppIcons.UserAddOutlined}
          ></Button>
        )}
        <Logout
          visibleProfile={visibleProfile}
          handleVisibleChangeProfile={handleVisibleChangeProfile}
        />
      </Col>
      {router.query.edit === "groupDetail" && (
        <GroupDetailModal
          isOpen={router.query.edit === "groupDetail"}
          onRequestClose={closeModal}
          groupDetail={currentGroup}
        ></GroupDetailModal>
      )}
    </Row>
  );
};
