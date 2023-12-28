import React from "react";
import { Grid, Steps } from "antd";
import DraggerA from "../admin/DraggerA";
const HomeClient = () => (
    <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
    <span style={{color:'blue', opacity:'.7'}}>Pasos para realizar una solicitud</span>
    <Steps
      current={5}
      items={[
        {
          title: "Solicitud de soporte",
          description: "el personal revisará y aceptara su solicitud",
        },
        {
          title: "Seleccion de personal",
          description: "Proceso de sellción del personal para la atención",
        },
        {
          title: "Atención en proceso",
          description: "El personal realizara las atenciones solicitada",
        },
        {
          title: "Atención finalizada",
          description: "Se realizó la atención solicitada",
        },
        {
          title: "Conformidad de servicio",
          description: "Se realizó la atención solicitada",
        },
      ]}
    />
    <span style={{color:'blue', opacity:'.7'}}>Manejo del estado de la solicitud</span>
    <Steps
      current={2}
      items={[
        {
          title: "Atención en proceso",
          description: "El personal realizara las atenciones solicitada 'SOLICITADO'",
        },
        {
          title: "Atención finalizada",
          description: "Se realizó la atención solicitada 'ACEPTADO'",
        },
        {
          title: "Conformidad de servicio",
          description: "Se firmaron los documentos 'FIRMADO'",
        },
      ]}
    />
<DraggerA></DraggerA>
  </div>
);
export default HomeClient;
