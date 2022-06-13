import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";
import Image from "next/image";
import Link from "next/link";
import { LoginCredentials } from "../types/auth.types";
import { LoginOutlined } from "@ant-design/icons";
import Styles from "../../../../styles/Login.module.scss";
import cookie from "react-cookies";
import { getMyGroup } from "../../room/group/redux/getMy-group";
import { loginUser } from "../redux/auth.slice";
import { useRouter } from "next/router";

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

  const onLoginWithUser = async (userName: string) => {
    const values = {
      email: `${userName}@gmail.com`,
      password: "123456789",
    };

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
  };

  return (
    <>
      <Row justify="center">
        <Col md={12} sm={24} xs={22} className={Styles.innerContainer}>
          <div>
            <h1 className={Styles.chatTitle}>MONSTARLAB CHAT</h1>
            <Form
              name="login"
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{ email: "", password: "" }}
            >
              <Row justify="center">
                <Col md={12} sm={20} xs={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input type="email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Col md={12} sm={20} xs={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="center">
                <Col md={12} sm={20} xs={24}>
                  <Form.Item>
                    <Button
                      type="default"
                      className={Styles.loginButton}
                      loading={isSubmit}
                      htmlType="submit"
                    >
                      LOGIN
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row justify="center">
              <Col md={12} sm={24} xs={24}>
                <p>
                  Don&apos;t have an account? <Link href="/signup">Signup</Link>{" "}
                  Here
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={12} sm={24} xs={24} className={Styles.innerContainer2}>
          <Row justify="center">
            <Col md={16} sm={20} xs={20}>
              <h1 className={Styles.chatTitle}>LOGIN AS</h1>
              <Card
                className={Styles.cardContainer}
                onClick={() => onLoginWithUser("bradpitt")}
              >
                <div className={Styles.innerCard}>
                  <Image
                    src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/155592469/original/16fd2f36d6111d47dc9e4dc417cdd26b98959fe2/make-a-cool-cartoon-for-you.jpg"
                    width={50}
                    height={50}
                    alt="pro-pic-brad"
                  />
                  <p>LOGIN AS BRAD</p>
                  <LoginOutlined />
                </div>
              </Card>
            </Col>
          </Row>
          <Row justify="center">
            <Col md={16} sm={20} xs={20}>
              <Card
                className={Styles.cardContainer}
                onClick={() => onLoginWithUser("marykate")}
              >
                <div className={Styles.innerCard}>
                  <Image
                    src="https://i.etsystatic.com/15418561/c/2250/1788/0/230/il/f06c80/3233862560/il_340x270.3233862560_jwqd.jpg"
                    width={50}
                    height={50}
                    alt="pro-pic-mary"
                  />
                  <p>LOGIN AS MARY</p>
                  <LoginOutlined />
                </div>
              </Card>
            </Col>
          </Row>
          <Row justify="center">
            <Col md={16} sm={20} xs={20}>
              <Card
                className={Styles.cardContainer}
                onClick={() => onLoginWithUser("joematch")}
              >
                <div className={Styles.innerCard}>
                  <Image
                    src="https://pbs.twimg.com/media/Dyg-OCfW0AA9dKp.jpg"
                    width={50}
                    height={50}
                    alt="pro-pic-joe"
                  />
                  <p>LOGIN AS JOE</p>
                  <LoginOutlined />
                </div>
              </Card>
            </Col>
          </Row>
          <Row justify="center">
            <Col md={16} sm={20} xs={20}>
              <Card
                className={Styles.cardContainer}
                onClick={() => onLoginWithUser("kimwest")}
              >
                <div className={Styles.innerCard}>
                  <Image
                    src="https://www.seekpng.com/png/small/200-2009935_toilet-png-by-dianasurvive-cool-profile-pics-gaming.png"
                    width={50}
                    height={50}
                    alt="pro-pic-kim"
                  />
                  <p>LOGIN AS KIM</p>
                  <LoginOutlined />
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
