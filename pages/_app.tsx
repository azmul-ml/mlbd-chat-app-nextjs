import "../styles/globals.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

import { store } from "../app/redux/store";
import { exClientChat } from "../app/features/chat/redux/chat-client.slice";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />;
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
