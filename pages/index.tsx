import type { NextPage } from "next";
import cookie from "react-cookies";

import { AUTH_ACCESS_TOKEN } from "../app/features/auth/constants/auth.keys";
import Login from "../app/features/auth/screens/Login";
import MainLayout from "../app/features/chat/screens/MainLayout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      {cookie.load(AUTH_ACCESS_TOKEN) ? <MainLayout /> : <Login />}
    </div>
  );
};

export default Home;
