import React from 'react';
import { BrowserRouter as Router, Route, Link,} from 'react-router-dom';

const Ref = () => {
  const closeSession = () =>{
    localStorage.clear()
  }
  return (
      <nav>
        <ul>
          <li>
            <Link to="/admin/campus">SEDE</Link>
          </li>
          <li>
            <Link to="/admin/dependence">DEPENDENCIAS</Link>
          </li>
          <li>
            <Link to="/admin/profile-personal">DATOS PERSONALES</Link>
          </li>
          <li>
            <Link to="/admin/roles">ROLES Y PRIVILEGIOS</Link>
          </li>
          <li>
            <Link to="/admin/equipment">EQUIPOS INFORMATICOS</Link>
          </li>
          <li>
            <Link to="/admin/binnacle">BITACORA</Link>
          </li>
          <li><button onClick={closeSession} >salir</button></li>
        </ul>
      </nav>
  );
};

export default Ref;
