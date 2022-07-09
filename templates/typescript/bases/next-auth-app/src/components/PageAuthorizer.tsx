import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { useRouter } from "next/router";

import { FullPageSpinner } from "./FullPageSpinner";
import { useUserInfo } from "../hooks/use-user-info.hook";

interface Props {
  requiredPermissions: number;
  children: ReactElement;
}

export function PageAuthorizer({ requiredPermissions, children }: Props) {
  const { push: redirectTo } = useRouter();
  const { user, isLoading, isLoggedIn, hasPerms } = useUserInfo();

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) redirectTo("/login");

    if (isLoggedIn && !hasPerms(requiredPermissions))
      redirectTo("/permission-denied");
  }, [isLoading, isLoggedIn, user]);

  if (isLoading) return <FullPageSpinner />;

  return children;
}
