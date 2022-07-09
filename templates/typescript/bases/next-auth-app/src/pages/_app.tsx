import React from 'react';

import Head from "next/head";

import type { AppProps } from "next/app";

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { SessionProvider } from "next-auth/react";

import { ApolloProvider } from "@apollo/client";

import { apiClient } from "../services/apollo-client";

import { PageAuthorizer } from "../components/PageAuthorizer";

const theme = extendTheme({
  initialColorMode: 'system',
  colors: {
    primary: {
      100: "#35daad",
      200: "#97dcc9"
    },
    secondary: {
      100: "#4059AD",
      200: "#6577b2"
    }
  }
});

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { permissions: number };
}

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={apiClient}>
        <Head>
          <title>CODE Library</title>
          <meta
            name="description"
            content="CODE University of Applied Sciences Library Management System"
          />
        </Head>
        <ChakraProvider theme={theme}>
          {Component.permissions ? (
            <PageAuthorizer requiredPermissions={Component.permissions}>
              <Component {...pageProps} />
            </PageAuthorizer>
          ) : (
            <Component {...pageProps} />
          )}
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default App;
