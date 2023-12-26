import React from "react";
import { Routes, Route } from "react-router-dom";
import Login  from "../main/Login"
import DefaultPage from "../undefinded/Undefined";
import Main from "../main/Main";
function RouteDefault() {
  return (
    <Routes>
       <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<DefaultPage />}></Route>
    </Routes>
  );
}

export default RouteDefault;
