import React from 'react';
import { Routes as Router, Route } from 'react-router-dom';
import AppAdmin from '../admin/AppAdmin';
import AppClient from '../client/AppClient';

function Routes() {
  return (
    <Router>
       <Route path="/" element={<AppClient />} />
      <Route path="/admin" element={<AppAdmin />} />
    </Router>
  );
}

export default Routes;
