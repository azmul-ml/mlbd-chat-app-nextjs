import { Avatar, List, Tabs } from "antd";
import moment from "moment";
import React from "react";
import CustomModal from "../../../../../components/molecules/Modal";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { IGroupResponse } from "../../types/group-chat.types";

const { TabPane } = Tabs;

export interface GroupDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  groupDetail: IGroupResponse | null;
}

export default function GroupDetailModal({
  isOpen,
  onRequestClose,
  groupDetail,
}: GroupDetailModalProps) {
  const users = useAppSelector((state: RootState) => state.user);
  const currentGroupUsers = groupDetail?.members?.map(
    (member) =>
      users.filter((user) => {
        if (member === user._id) {
          return user;
        }
      })[0]
  );

  function callback(key: any) {
    console.log(key);
  }
  return (
    <CustomModal
      title={groupDetail?.meta.name}
      visible={isOpen}
      handleCancel={onRequestClose}
    >
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="About" key="1">
          <div>
            <label style={{ fontWeight: "bold" }}>Created On:</label>{" "}
            <label>
              <span>
                {moment(groupDetail?.created_at).format("MMMM Do YYYY")}
              </span>
            </label>
          </div>
        </TabPane>
        <TabPane tab="Members" key="2">
          <List
            itemLayout="horizontal"
            dataSource={currentGroupUsers}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={
                    <a href="https://ant.design">{item.name.toUpperCase()}</a>
                  }
                  description={
                    item?.roles?.length < 1
                      ? "MEMBER"
                      : item?.roles[0]?.toUpperCase()
                  }
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Settings" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </CustomModal>
  );
}
