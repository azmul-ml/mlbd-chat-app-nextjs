import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Button, Select, Skeleton, Spin } from "antd";
import { Formik } from "formik";
import { Input } from "formik-antd";

import { ICreateGroupChat } from "../../types/group-chat.types";
import { getUsers, userSlice } from "../../../../user/redux/user.slice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { creatGroup } from "../../redux/create-group.slice";
import CustomModal from "../../../../../components/common/atoms/Modal";
import router from "next/router";

const { Option } = Select;

export default function CreateGroupModal({
  isOpen,
  onRequestClose,
  handleGroupModal,
}: any) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.data.user_id);
  const [users, setUsers] = useState([""]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const getUser = useCallback(async () => {
    setLoadingUsers(true);
    const { addUser } = userSlice.actions;
    const users = await dispatch(getUsers());
    dispatch(addUser(users.payload.data));
    setUsers(users.payload.data);
    setLoadingUsers(false);
  }, [dispatch]);

  const handleSChange = (value: any) => {
    setSelectedUser(value);
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleGroupeCreation = async (values: any, setSubmitting: any) => {
    const data: ICreateGroupChat = {
      member_ids: [...selectedUser, userId],
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkOTUxYzU3ZDEyYTIwMDE1ZTgxYWFkIiwiZW1haWwiOiJzaGltdWxwYXRvQGdtYWlsLmNvbSIsIm5hbWUiOiJTaGltdWwgSGFzc2FuIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI1ODk0ODI5fQ.jpPhKsbNd37p4s2eOXljtIsFA1pZr21Es9gyrGxtMTw",
      meta: {
        talk_room_type: "GROUP",
        name: values.name,
      },
    };
    const res = await dispatch(creatGroup(data));
    if (res.payload.data.members.some((member: string) => member === userId)) {
      router.push(`/room/${res.payload.data.id}`);
      setSubmitting(false);
    }
    dispatch(handleGroupModal(false));
  };

  return (
    <>
      <CustomModal
        title="Create Group"
        visible={isOpen}
        handleCancel={onRequestClose}
      >
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            handleGroupeCreation(values, setSubmitting);
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={24}>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={handleSChange}
                    placeholder="Select Members"
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
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
                </Col>
                <Col className="gutter-row" span={24}>
                  <Input
                    placeholder="Group Name"
                    // style={{ width: "330px" }}
                    name="name"
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && errors.name}
                </Col>
              </Row>
              <Button
                style={{ marginTop: "18px" }}
                htmlType="submit"
                type="primary"
                disabled={isSubmitting}
              >
                Create Group
              </Button>
            </form>
          )}
        </Formik>
      </CustomModal>
    </>
  );
}
