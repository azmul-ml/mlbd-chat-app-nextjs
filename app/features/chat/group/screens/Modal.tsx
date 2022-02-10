import React, { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Row, Col, Button, Select } from "antd";
import { Formik } from "formik";
import { Input } from "formik-antd";

import createGroupChat from "../api/group-chat.api";
import { ICreateGroupChat } from "../types/group-chat.types";
import { getUsers, userSlice } from "../../../user/redux/user.slice";
import { useAppDispatch } from "../../../../redux/hooks";

const { Option } = Select;

// const children: any = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

export default function Modal({
  style,
  isOpen,
  onRequestClose,
  handleGroupModal,
}: any) {
  const dispatch = useAppDispatch();
  // const { user }: any = useAppSelector((state) => state.user);

  const [users, setUsers] = useState([""]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUser = useCallback(async () => {
    const { addUser } = userSlice.actions;
    const users = await dispatch(getUsers());
    dispatch(addUser(users.payload.data));
    setUsers(users.payload.data);
  }, [dispatch]);

  function handleSChange(value: any) {
    setSelectedUser(value);
  }
  // const setAdminValue = () => {};

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <ReactModal
        // title="Basic Modal"
        style={customStyles}
        isOpen={isOpen}
        // onOk={handleOk}
        onRequestClose={onRequestClose}
      >
        <h3>Create Group</h3>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values, { setSubmitting }) => {
            const data: ICreateGroupChat = {
              member_ids: selectedUser,
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBkOTUxYzU3ZDEyYTIwMDE1ZTgxYWFkIiwiZW1haWwiOiJzaGltdWxwYXRvQGdtYWlsLmNvbSIsIm5hbWUiOiJTaGltdWwgSGFzc2FuIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI1ODk0ODI5fQ.jpPhKsbNd37p4s2eOXljtIsFA1pZr21Es9gyrGxtMTw",
              meta: {
                talk_room_type: "GROUP",
                name: values.name,
              },
            };
            dispatch(createGroupChat(data) as any);
            handleGroupModal(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={24}>
                  <Select
                    // name="member_ids"
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    // defaultValue={values.member_ids}
                    onChange={handleSChange}
                    // value={value => setFieldValue("member_ids")}
                  >
                    {users?.map((usr: any) => (
                      <Option key={usr._id} value={usr._id}>
                        {usr.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col className="gutter-row">
                  <Input
                    // type="text"
                    style={{ width: "330px" }}
                    name="name"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.name}
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
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </ReactModal>
    </>
  );
}

const customStyles = {
  // overlay: {
  //   backgroundColor: "#494a4f",
  //   opacity: "0.95",
  // },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // width: "5%",
    // maxWidth: "250px",
  },
};
