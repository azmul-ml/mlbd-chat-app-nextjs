import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import cookie from "react-cookies";

import { loginUser } from "../redux/auth.slice";
import { LoginCredentials } from "../types/auth.types";
import { useAppDispatch } from "../../../redux/hooks";
import { getMyGroup } from "../../chat/group/redux/getMy-group";
import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";

export default function Login() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  let router = useRouter();
  const [isSubmit, setisSubmit] = useState(false);

  const handleSubmit = async (values: LoginCredentials) => {
    try {
      const response = await dispatch(loginUser(values));
      if (response.payload.data) {
        const data = {
          token: cookie.load(AUTH_ACCESS_TOKEN),
        };
        const res = await dispatch(getMyGroup(data));
        console.log(res);
        router.push(`/room/${res.payload[0].id}`);
      }
    } finally {
      setisSubmit(false);
    }
  };

  return (
    <div>
      <Row justify="center">
        <Col md={10} sm={24}>
          <h1>Login!</h1>
        </Col>
      </Row>

      <Form
        name="login"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ email: "", password: "" }}
      >
        <Row justify="center">
          <Col md={24} sm={24}>
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
          <Col md={24} sm={24}>
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
          <Col md={24} sm={24}>
            <Form.Item>
              <Button type="primary" loading={isSubmit} htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row justify="center">
        <Col md={10} sm={24}>
          <p>
            Don&apos;t have an account? <Link href="/register">Signup</Link>{" "}
            Here
          </p>
        </Col>
      </Row>
    </div>
  );
}
