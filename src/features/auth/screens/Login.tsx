import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import cookie from "react-cookies";

import { loginUser } from "../redux/auth.slice";
import { LoginCredentials } from "../types/auth.types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getMyGroup } from "../../room/group/redux/getMy-group";
import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";

export default function Login() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups.data);
  let router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (values: LoginCredentials) => {
    try {
      setIsSubmit(true);
      const response = await dispatch(loginUser(values));
      if (response.payload.data) {
        const data = {
          token: cookie.load(AUTH_ACCESS_TOKEN),
        };

        /*
         ** Getting the groups is the first thing to do, depending on
         ** the group response the first screen will appear
         */
        await dispatch(getMyGroup(data));
      }
    } finally {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    /*
     ** If there is any group created by the user
     ** the user will be taken to the first group
     ** from the created groups
     */
    if (groups && groups?.length > 0) {
      router.push(`/room/${groups[0].id}`);
    }

    /*
     ** If there no group created by the user
     ** the user will be taken to the create
     ** group screen
     */
    if (groups && groups.length === 0) {
      router.push(`/room/create-group`);
    }
  }, [groups, router]);

  return (
    <>
      <h1>Login!</h1>

      <Form
        name="login"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ email: "", password: "" }}
      >
        <Row justify="center">
          <Col md={7} sm={14}>
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
          <Col md={7} sm={14}>
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
          <Col md={7} sm={14}>
            <Form.Item>
              <Button type="primary" loading={isSubmit} htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row justify="center">
        <Col md={7} sm={24}>
          <p>
            Don&apos;t have an account? <Link href="/signup">Signup</Link> Here
          </p>
        </Col>
      </Row>
    </>
  );
}
