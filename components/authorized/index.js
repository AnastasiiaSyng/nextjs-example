import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Page from "./NotauthorizedPage/index";

// TODO: this can all be improved in the future
const CheckRedirect = ({ isAuthorized }) => {
  useEffect(() => {
    const checkTimeout = setTimeout(() => {
      if (!isAuthorized) {
        router.push("/login");
      }
    }, 1000);
    if (isAuthorized) {
      clearTimeout(checkTimeout);
    }
    return () => {
      clearTimeout(checkTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default function Authorized({ children }) {
  const router = useRouter();
  const [getUserInfo, setUserInfo] = useState("admin");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  if (!isAuthorized) {
    return <CheckRedirect isAuthorized={isAuthorized} />;
  }

  if (router.pathname.match(/\/hi/gi)) {
    if (!isAdmin) {
      //check the user is an admin before allowing them to view the page
      return <Page />;
    }
  }

  // TODO: Improve the way that this is done! This is not great
  //@ts-ignore
  return <>{children({ isAdmin, isAuthorized })}</>;
}
