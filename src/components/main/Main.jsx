import React from "react";
import { useNavigate } from "react-router-dom";
import logo_horizontal from "../../assets/logo_horizontal.png"
import bienvenido2 from "../../assets/bienvenido2.png"
import { FileOutlined, LoginOutlined, ReadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button } from "antd/es/radio";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="content-flex">
        <div className="img-absolute"></div>
      <div className="flex-left">
      <img src={logo_horizontal} alt="" />
      <h4>Sistema de Gestión de inventario del Parque Informático</h4>
      <span> La Universidad Nacional Amazónica de Madre de Dios en el marco del 
        proceso de Transformación Digital en las Entidades de la Administración 
        Pública, implementa el Sistema de Gestión de Inventario del Parque 
        Informático acorde a los estandares y buenas practicas establecidos en 
        la Norma NTP ISO/IEC - 17799-2007 - Clausula 03 - Administracion de 
        Activos - 7.1.1. Inventario de Activos. Resolución Jefatural 
        N° 053-2003-INEI. Aprueban Directiva sobre "Norma Técnica para la 
        implementación del Registro de Recursos Informáticos en las 
        instituciones de la Administración Pública, con el fin de contar con 
        información actualizada y confiable.</span>
      <div className="wrap-button">
      <button className="wrap-bt" onClick={() => navigate("/login")}>{<LoginOutlined style={{color:"white", fontSize:'18px'}} />}Ingresar</button>
      <button className="wrap-bt">{<SearchOutlined style={{color:"white", fontSize:'18px'}} />}Consulta</button>
      </div>
      </div>
      <div className="flex-right">
<h4>Ventanilla virtual</h4>
<img src={bienvenido2} alt="" />
<span>Registrarse para acceder a las siguientes opciones</span>
<span>{<FileOutlined style={{color:"white", fontSize:'18px'}} />}Presenta documentos para trámite</span>
<span>{<ReadOutlined style={{color:"white", fontSize:'18px'}} />}Consulta el estado de tu trámite</span>

      </div>
    </div>
  );
};
export default Main;
