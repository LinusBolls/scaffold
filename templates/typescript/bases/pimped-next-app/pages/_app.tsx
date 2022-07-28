import React from "react";

import type { FunctionComponent } from "react";

import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

// import { SessionProvider } from "next-auth/react";

// import { ApolloProvider } from "@apollo/client";

// import { apiClient } from "../services/apollo-client";

// import { PageAuthorizer } from "../components/PageAuthorizer";

// interface CustomAppProps extends Omit<AppProps, "Component"> {
//   Component: AppProps["Component"] & { permissions: number };
// }

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

import { withItemsContext } from "../services/items/items.context";

library.add(fab, faCheckSquare, faCoffee);

function App({ Component, pageProps }: AppProps) {
  return (
    // <SessionProvider session={pageProps.session} refetchInterval={0}>
    //   <ApolloProvider client={apiClient}>
    // <Head>
    //   <title>CODE Library</title>
    //   <meta
    //     name="description"
    //     content="CODE University of Applied Sciences Library Management System"
    //   />
    // </Head>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      {/* {Component.permissions ? (
            <PageAuthorizer requiredPermissions={Component.permissions}>
              <Component {...pageProps} />
            </PageAuthorizer>
          ) : (
            <Component {...pageProps} />
          )} */}
    </ChakraProvider>
    //   </ApolloProvider>
    // </SessionProvider>
  );
}
export default withItemsContext(App as FunctionComponent);
// export default App;
