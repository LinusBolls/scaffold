import React, { useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { SignInCard } from "../components/SignInCard";

import { ExternalPage } from "../layout/ExternalPage";

export default function LogInPage() {
  useErrorToasts();

  return (
    <ExternalPage>
      <SignInCard />
    </ExternalPage>
  );
}

const errorMessages = {
  Signin: "Try signing in with a different account.",
  Callback:
    "We're facing issues while trying to connect to one of our servers.",
  Default: "Unable to sign in.",
};

const messageFor = (e: LoginError) =>
  e && (errorMessages[e] ?? errorMessages.Default);

type LoginError = "Signin" | "Callback";

function useErrorToasts() {
  const {
    query: { error },
  } = useRouter();

  const toast = useToast();
  const router = useRouter();

  const errors = error as LoginError;

  useEffect(() => {
    router.replace("/login", undefined, { shallow: true });

    if (errors === undefined) return;

    if (Array.isArray(errors)) {
      errors.map((error: LoginError) => {
        toast({
          title: "Error",
          description: messageFor(error),
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          variant: "subtle",
        });
      });
      return;
    }

    toast({
      title: "Error",
      description: messageFor(errors),
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
      variant: "top-accent",
    });
  }, [error]);
}
