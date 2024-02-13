import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../scss/main.scss";

import "react-toastify/dist/ReactToastify.css";
import { wrapper } from "../store/store";

import { useRouter } from "next/router";
import { Toaster } from 'react-hot-toast';
// import '../styles/globals.css';
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  const Router = useRouter();
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      analytics.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [Router.events]);

  return (
    <>
      <Head>
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        /> */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {pageProps?.structuredData && (
          <script
            key={pageProps.structuredData.key}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(pageProps.structuredData.data),
            }}
          />
        )}
      </Head>
      <>
      <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: 'hot-toast-opening-class',
            duration: 3000,
            // style: {
            //   background: '#363636',
            //   color: '#fff',
            // },
            // Default options for specific types
            success: {
              duration: 3000,
              // theme: {
              //   primary: 'green',
              //   secondary: 'black',
              // },
            },
          }}
        />
        {/* <CustomThemeProvider> */}
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
        {/* </CustomThemeProvider> */}
      </>
    </>
  );
}

MyApp.propTypes = {
  // Component: PropTypes.func,
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default wrapper.withRedux(MyApp);



// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }