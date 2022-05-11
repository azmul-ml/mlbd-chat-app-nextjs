import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import cookie from "react-cookies";

import { AUTH_ACCESS_TOKEN } from "../../src/features/auth/constants/auth.keys";
import Login from "./../../src/features/auth/screens/Login";
import Styles from "../../styles/Login.module.scss";

const LoginPage: NextPage = () => {
  return (
    <div className={Styles.container}>
      <Login />
    </div>
  );
};

export default LoginPage;
