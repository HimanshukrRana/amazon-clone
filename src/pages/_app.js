import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
// import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;

