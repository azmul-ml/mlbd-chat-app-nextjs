import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Row, Col } from "antd";
import cookie from "react-cookies";

import { registerUser } from "../redux/auth.slice";
import { RegistrationCredentials } from "../types/auth.types";
import { useAppDispatch } from "../../../redux/hooks";
import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";
import { getMyGroup } from "../../room/group/redux/getMy-group";

export default function Register() {
  const dispatch = useAppDispatch();
  let router = useRouter();
  const [form] = Form.useForm();

  const [isSubmit, setisSubmit] = useState(false);

  const handleSubmit = async (values: RegistrationCredentials) => {
    try {
      setisSubmit(true);
      const data = { ...values, roles: ["Admin"] };
      const response = await dispatch(registerUser(data));
      if (response) {
        router.push("/");
      }
    } finally {
      setisSubmit(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      {/* <Row justify="center">
        <Col md={10} sm={24}> */}
      <h1>Register!</h1>
      {/* </Col>
      </Row> */}

      <Form
        name="login"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ name: "", email: "", password: "", roles: ["admin"] }}
        // style={{ width: "max-content" }}
      >
        <Row justify="center">
          <Col md={10} sm={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col md={10} sm={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col md={10} sm={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col md={10} sm={24}>
            <Form.Item>
              <Button type="primary" loading={isSubmit} htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
