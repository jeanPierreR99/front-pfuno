import React, { useEffect, useState } from "react";
import { Routes as Router, Route } from "react-router-dom";
import AppAdmin from "../admin/AppAdmin";
import AppClient from "../client/AppClient";
import DemoRadialGraph from "../graph/Graph";
import TableCampus from "../admin/TableCampus.jsx";
import TableDependence from "../admin/TableDependence";
import ProfilePersonal from "../admin/ProfilePersonal";
import TableRoles from "../admin/TableRoles";
import TableEquipment from "../admin/TableEquipment";
import TableBinnacle from "../admin/TableBinnacle";
import Login from "../main/Login";
import { ROLE } from "../../constants";
import Undefined from "../undefinded/Undefined";

function Routes() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    const userStorageParse = JSON.parse(storedRole)
    if (userStorageParse) {
      setUserRole(userStorageParse.role);
    }
  }, []);

  return (
    <Router>
      {userRole === '' &&  <Route path="/login" element={<Login />} />}
      {(userRole && userRole === ROLE[0] || userRole === ROLE[2]) && (
        <>
          <Route path="/admin" element={<AppAdmin />} />
          <Route path="/admin/campus" element={<TableCampus />} />
          <Route path="/admin/dependence" element={<TableDependence />} />
          <Route path="/admin/profile-personal" element={<ProfilePersonal />} />
          <Route path="/admin/roles" element={<TableRoles />} />
          <Route path="/admin/equipment" element={<TableEquipment />} />
          <Route path="/admin/binnacle" element={<TableBinnacle />} />
          <Route path="/red" element={<DemoRadialGraph />} />
        </>
      )}
      {userRole && userRole === ROLE[1] && <Route path="/" element={<AppClient />} />}

      <Route path="*" element={<Undefined />} />
    </Router>
  );
}

export default Routes;
