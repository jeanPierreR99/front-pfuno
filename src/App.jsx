import React from "react";
import RouteMain from "./components/routes/RouteMain";
import { BrowserRouter } from "react-router-dom";
import {
  LoginProvider,
  RoleProvider,
} from "./components/routes/context/Context.provider";
const App = () => (
  <LoginProvider>
    <RoleProvider>
      <BrowserRouter>
        <div className="App app">
          <RouteMain></RouteMain>
        </div>
      </BrowserRouter>
    </RoleProvider>
  </LoginProvider>
);

export default App;
