import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";

import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";
import Link from "next/link";
import { RegistrationCredentials } from "../types/auth.types";
import Styles from "../../../../styles/Login.module.scss";
import cookie from "react-cookies";
import { getMyGroup } from "../../room/group/redux/getMy-group";
import { registerUser } from "../redux/auth.slice";
import { useAppDispatch } from "../../../redux/hooks";
import { useRouter } from "next/router";

export default function Register() {
  const dispatch = useAppDispatch();
  let router = useRouter();
  const [form] = Form.useForm();

  const [isSubmit, setisSubmit] = useState(false);

  const handleSubmit = async (values: RegistrationCredentials) => {
    try {
      setisSubmit(true);
      delete values.confirm;
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
      <h1 className={Styles.chatTitle}>REGISTER TO MONSTARLAB CHAT</h1>
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
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col md={10} sm={24}>
            <Form.Item>
              <Button
                type="default"
                className={Styles.loginButton}
                loading={isSubmit}
                htmlType="submit"
              >
                REGISTER
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row justify="center">
        <Col md={12} sm={24} xs={24}>
          <p>
            Have an account? <Link href="/">Login</Link> Here
          </p>
        </Col>
      </Row>
    </div>
  );
}
