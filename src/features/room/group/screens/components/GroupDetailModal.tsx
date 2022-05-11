import {
  Avatar,
  Button,
  List,
  Tabs,
  Typography,
  Popconfirm,
  Select,
  Spin,
} from "antd";
import { DeleteFilled } from "@ant-design/icons";

import cookie from "react-cookies";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import CustomModal from "../../../../../components/common/atoms/Modal";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { IAddMember, IGroupResponse } from "../../types/group-chat.types";
import { AUTH_ACCESS_TOKEN } from "../../../../auth/constants/auth.keys";
import { updateGroup } from "../../redux/update.group";
import { useRouter } from "next/router";
import { deleteGroup } from "../../redux/delete.group.slice";
import { ModalTab } from "../../constants/modal.enum";
import { getUsers, userSlice } from "../../../../user/redux/user.slice";
import { addGroupMemberSlice } from "../../redux/add.group.member.slice";
import { removeGroupMemberSlice } from "../../redux/remove.member";

const { TabPane } = Tabs;
const { Text } = Typography;
const { Option } = Select;

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
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const users = useAppSelector((state: RootState) => state.user);
  const groups = useAppSelector((state) => state.groups.data);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [currentGroupUsers, setCurrentGroupUsers] = useState([]);
  const instantGroupMemberAdd = useAppSelector(
    (state) => state.onGroupMemberAdded.data
  );
  const instantGroupMemberRemoved = useAppSelector(
    (state) => state.onGroupMemberRemoved.data
  );
  const instantUpdatedGroup = useAppSelector(
    (state) => state.onGroupUpdate.data
  );

  let router = useRouter();
  const tab = router.query.tab;

  useEffect(() => {
    const groupMembers = groupDetail?.members?.map(
      (member) =>
        users.filter((user) => {
          if (member === user._id) {
            return user;
          }
        })[0]
    );
    setCurrentGroupUsers(groupMembers);
  }, [groupDetail]);

  useEffect(() => {
    if (instantGroupMemberAdd) {
      const groupMember = instantGroupMemberAdd.user_ids?.map(
        (member) =>
          users.filter((user) => {
            if (member === user._id) {
              return user;
            }
          })[0]
      );
      setCurrentGroupUsers([...currentGroupUsers, ...groupMember]);
    }
    // console.log(instantGroupMemberAdd.user_ids);
  }, [instantGroupMemberAdd]);

  useEffect(() => {
    if (instantGroupMemberRemoved) {
      const groupMember = currentGroupUsers.filter(
        (user) => !instantGroupMemberRemoved.user_ids.includes(user._id)
      );
      setCurrentGroupUsers([...groupMember]);
      console.log(instantGroupMemberRemoved);
    }
  }, [instantGroupMemberRemoved]);

  const getUser = useCallback(async () => {
    setLoadingUsers(true);
    const { addUser } = userSlice.actions;
    const users = await dispatch(getUsers());
    dispatch(addUser(users.payload.data));
    // setUsers(users.payload.data);
    setLoadingUsers(false);
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  function callback(key: any) {
    console.log(key);
  }
  const handleNameEdit = (name: any) => {
    const token = cookie.load(AUTH_ACCESS_TOKEN);
    const data: any = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkOTUxYzU3ZDEyYTIwMDE1ZTgxYWFkIiwiZW1haWwiOiJzaGltdWxwYXRvQGdtYWlsLmNvbSIsIm5hbWUiOiJTaGltdWwgSGFzc2FuIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI1ODk0ODI5fQ.jpPhKsbNd37p4s2eOXljtIsFA1pZr21Es9gyrGxtMTw",
      group_id: groupDetail?.id,
      meta: {
        name: name,
      },
    };
    dispatch(updateGroup(data));
  };
  const token = cookie.load(AUTH_ACCESS_TOKEN);
  const handleGroupDelete = async () => {
    const data: any = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkOTUxYzU3ZDEyYTIwMDE1ZTgxYWFkIiwiZW1haWwiOiJzaGltdWxwYXRvQGdtYWlsLmNvbSIsIm5hbWUiOiJTaGltdWwgSGFzc2FuIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI1ODk0ODI5fQ.jpPhKsbNd37p4s2eOXljtIsFA1pZr21Es9gyrGxtMTw",
      group_id: groupDetail?.id,
    };
    const response = await dispatch(deleteGroup(data));
    if (response.payload.data && groups) {
      router.push(`/room/${groups[0].id}`);
    }
  };

  const handleSChange = (value: any) => {
    setSelectedUser(value);
  };
  return (
    <CustomModal
      title={
        (!instantUpdatedGroup && groupDetail?.meta.name) ||
        (instantUpdatedGroup && instantUpdatedGroup?.meta.name)
      }
      visible={isOpen || router.query.edit === "groupDetail"}
      handleCancel={onRequestClose}
    >
      <Tabs defaultActiveKey={ModalTab[tab]} onChange={callback}>
        <TabPane tab="About" key="1">
          <div
            style={{
              display: "flex",
              height: "50px",
              alignItems: "center",
              border: "solid blue 1px",
              background: "#0e3752",
              borderRadius: "5px",
              color: "whitesmoke",
              marginBottom: "10px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginRight: "100px",
                marginLeft: "30px",
              }}
            >
              Change Name:
            </div>{" "}
            <Text
              style={{ color: "whitesmoke" }}
              editable={{ onChange: handleNameEdit }}
              keyboard
            >
              {!instantUpdatedGroup && groupDetail?.meta.name}
              {instantUpdatedGroup && instantUpdatedGroup?.meta.name}
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              height: "50px",
              alignItems: "center",
              border: "solid blue 1px",
              background: "#0e3752",
              borderRadius: "5px",
              color: "whitesmoke",
              marginBottom: "10px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginRight: "100px",
              }}
            >
              Created On:
            </div>

            <div>{moment(groupDetail?.created_at).format("MMMM Do YYYY")}</div>
          </div>
          <div
            style={{
              display: "flex",
              height: "50px",
              alignItems: "center",
              border: "solid blue 1px",
              background: "#0e3752",
              borderRadius: "5px",
              color: "whitesmoke",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginRight: "100px",
              }}
            >
              Delete this group
            </div>
            <Popconfirm
              title="Are you sure to delete this Group?"
              onConfirm={handleGroupDelete}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        </TabPane>
        <TabPane tab="Members" key="2">
          <div style={{ display: "flex" }}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%", marginRight: "5px" }}
              onChange={handleSChange}
              placeholder="Add Members"
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users?.map((usr: any) => (
                <Option key={usr._id} value={usr._id}>
                  {loadingUsers ? (
                    <div style={{ textAlign: "center" }}>
                      <Spin />
                    </div>
                  ) : (
                    usr.name
                  )}
                </Option>
              ))}
            </Select>
            <Button
              onClick={() => {
                const data: IAddMember = {
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkOTUxYzU3ZDEyYTIwMDE1ZTgxYWFkIiwiZW1haWwiOiJzaGltdWxwYXRvQGdtYWlsLmNvbSIsIm5hbWUiOiJTaGltdWwgSGFzc2FuIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI1ODk0ODI5fQ.jpPhKsbNd37p4s2eOXljtIsFA1pZr21Es9gyrGxtMTw",
                  group_id: groupDetail?.id,
                  user_ids: selectedUser,
                };
                dispatch(addGroupMemberSlice(data));
                setSelectedUser([]);
              }}
            >
              Add Member
            </Button>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={currentGroupUsers}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={
                    <a href="https://ant.design">{item?.name?.toUpperCase()}</a>
                  }
                  description={
                    item?.roles?.length < 1
                      ? "MEMBER"
                      : item?.roles[0]?.toUpperCase()
                  }
                />
                <DeleteFilled
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    const data: IAddMember = {
                      token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkOTUxYzU3ZDEyYTIwMDE1ZTgxYWFkIiwiZW1haWwiOiJzaGltdWxwYXRvQGdtYWlsLmNvbSIsIm5hbWUiOiJTaGltdWwgSGFzc2FuIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI1ODk0ODI5fQ.jpPhKsbNd37p4s2eOXljtIsFA1pZr21Es9gyrGxtMTw",
                      group_id: groupDetail?.id,
                      user_ids: [item._id],
                    };
                    dispatch(removeGroupMemberSlice(data));
                  }}
                />
              </List.Item>
            )}
          />
        </TabPane>
        {/* <TabPane tab="Settings" key="3">
          Content of Tab Pane 3
        </TabPane> */}
      </Tabs>
    </CustomModal>
  );
}
