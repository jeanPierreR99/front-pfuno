import React from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import AppAdmin from '../admin/AppAdmin';
import AppClient from '../client/AppClient';
import DemoRadialGraph from '../graph/Graph';
import TableCampus from '../admin/TableCampus.jsx';
import TableDependence from '../admin/TableDependence';
import ProfilePersonal from '../admin/ProfilePersonal';
import TableRoles from '../admin/TableRoles';
import TableEquipment from '../admin/TableEquipment';
import TableBinnacle from '../admin/TableBinnacle';

function Routes() {
  return (
    <Router>
      <Route path="/" element={<AppClient />} />
      <Route path="/admin" element={<AppAdmin />} />
      <Route path="/admin/campus" element={<TableCampus />} />
      <Route path="/admin/dependence" element={<TableDependence />} />
      <Route path="/admin/profile-personal" element={<ProfilePersonal />} />
      <Route path="/admin/roles" element={<TableRoles />} />
      <Route path="/admin/equipment" element={<TableEquipment />} />
      <Route path="/admin/binnacle" element={<TableBinnacle />} />
      <Route path="/red" element={<DemoRadialGraph />} />
    </Router>
  );
}

export default Routes;
