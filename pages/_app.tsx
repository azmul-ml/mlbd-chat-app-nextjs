import "../styles/globals.css";
import "antd/dist/antd.css";
import styles from "../styles/layout.module.scss";

import { Provider } from "react-redux";
import cookie from "react-cookies";

import type { AppProps } from "next/app";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

import { store } from "../src/redux/store";
import { exClientChat } from "../src/features/room/redux/chat-client.slice";
import MainLayout from "../src/features/room/screens/MainLayout";
import PageLeft from "../src/components/common/layout/PageLeft";
import Login from "../src/features/auth/screens/Login";
import { AUTH_ACCESS_TOKEN } from "../src/features/auth/constants/auth.keys";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </PersistGate>
      </Provider>
    </>
  );
}
export default MyApp;
