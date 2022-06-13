import { Col, Row } from "antd";

import Login from "./../../src/features/auth/screens/Login";
import type { NextPage } from "next";
import Styles from "../../styles/Login.module.scss";

const LoginPage: NextPage = () => {
  return (
    <div className={Styles.container}>
      <Login />
    </div>
  );
};

export default LoginPage;
