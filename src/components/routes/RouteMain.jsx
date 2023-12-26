import React, { useEffect, useState } from "react";
import { ROLE } from "../../constants";
import { useLogin, useRole } from "./context/Context.provider";
import RouteAdmin from "./RouteAdmin";
import RouteSupport from "./RouteSupport";
import RouteDefault from "./RouteDefault";

function RouteMain() {
  const { isLogin, setIsLogin } = useLogin();
  const { isAdmin, setIsAdmin } = useRole();

  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    const userStorageParse = JSON.parse(storedRole);
    if (userStorageParse) {
      console.log("asdasd")
      setIsLogin(true);
      if (
        userStorageParse.role == ROLE[0] ||
        userStorageParse.role == ROLE[1]
      ) {
        setIsAdmin(true);
      }
    }
  }, []);

  return isLogin && isAdmin ? (
    <RouteAdmin />
  ) : isLogin && !isAdmin ? (
    <RouteSupport />
  ) : (
    <RouteDefault />
  );
}

export default RouteMain;
