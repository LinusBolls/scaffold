import React from "react";

import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";

export function FullPageSpinner() {
  return (
    <Flex
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        color={useColorModeValue("gray.600", "gray.300")}
        size="xl"
      />
    </Flex>
  );
}