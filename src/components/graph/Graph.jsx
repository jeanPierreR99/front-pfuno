import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { RadialGraph } from '@ant-design/graphs';

var objJson = [
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "OFICINA DE TECNOLOGIAS DE LA INFORMACION",
    "ABREVIATURA": "OTI",
    "NETWORKS": "172.17.1.0/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "BIBLIOTECA CENTRAL",
    "ABREVIATURA": "BC",
    "NETWORKS": "172.17.30.15/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "OFICINA DE GESTION AMBIENTAL",
    "ABREVIATURA": "OGAC",
    "NETWORKS": "172.17.1.57/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "OFICINA DE IMAGEN INSTITUCIONAL",
    "ABREVIATURA": "OFII",
    "NETWORKS": "172.17.21.54/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "RECTORADO",
    "ABREVIATURA": "R",
    "NETWORKS": "172.17.26.9/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "SECRETARIA GENERAL",
    "ABREVIATURA": "SG",
    "NETWORKS": "172.17.12.5/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "VICERRECTORADO DE INVESTIGACION",
    "ABREVIATURA": "VRI",
    "NETWORKS": "172.17.51.34/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "OFICINA DE COOPERACION Y RELACIONES INTERNACIONALES",
    "ABREVIATURA": "OCRI",
    "NETWORKS": "172.17.51.18/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "BIBLIOTECA",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "DIRECCION DE PROYECCION SOCIAL",
    "ABREVIATURA": "DPS",
    "NETWORKS": "172.17.26.28/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD ABASTECIMIENTO",
    "ABREVIATURA": "UA",
    "NETWORKS": "172.17.6.12/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD ASESORIA JURIDICA",
    "ABREVIATURA": "UAJ",
    "NETWORKS": "172.17.9.10/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD GENERAL ADMINISTRACION",
    "ABREVIATURA": "UGA",
    "NETWORKS": "172.17.18.13/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DIRECCION UNIVERSITARIA DE PLANIFICACION Y PRESUPUESTO",
    "ABREVIATURA": "UDUPP",
    "NETWORKS": "172.17.6.16/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD FUNCIONAL DE DESARROLLO PERSONAL",
    "ABREVIATURA": "UODP",
    "NETWORKS": "172.17.9.81/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD SECRETARIA TECNICA PAD-ADMIN",
    "ABREVIATURA": "UST",
    "NETWORKS": "172.17.8.74/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD SECRETARIA TECNICA PAD-DOCENTE",
    "ABREVIATURA": "UST",
    "NETWORKS": "172.17.8.68/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DE BIENES PATRIMONIALES",
    "ABREVIATURA": "UBP",
    "NETWORKS": "172.17.9.27/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DE CONTABILIDAD",
    "ABREVIATURA": "UC",
    "NETWORKS": "172.17.18.21/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DE INFRAESTRUCTURA DE OBRAS",
    "ABREVIATURA": "UIO",
    "NETWORKS": "172.17.18.18/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DE LIQUIDACION DE OBRAS",
    "ABREVIATURA": "ULO",
    "NETWORKS": "172.17.18.11/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DE RECURSOS HUMANOS",
    "ABREVIATURA": "URH",
    "NETWORKS": "172.17.6.21/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DE TESORERIA",
    "ABREVIATURA": "UT",
    "NETWORKS": "172.17.9.23/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD FORMULADORA",
    "ABREVIATURA": "UF",
    "NETWORKS": "172.17.9.41/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "ADMINISTRATIVA",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD FUNCIONAL DE REMUNERACIONES",
    "ABREVIATURA": "UFR",
    "NETWORKS": "172.17.9.29/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "AUDITORIO",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "ORGANO DE CONTROL INSTITUCIONAL",
    "ABREVIATURA": "OCI",
    "NETWORKS": "172.17.19.23/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "AUDITORIO",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "UNIDAD DE ADMISION",
    "ABREVIATURA": "UA",
    "NETWORKS": "172.17.19.20/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "ALMACEN CENTRAL",
    "ABREVIATURA": "AC",
    "NETWORKS": "",
    "FORMA DE CONEXION": "",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "LABORATORIO DE CIENCIA BASICAS",
    "ABREVIATURA": "LCB",
    "NETWORKS": "172.17.29.56/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "DA-AGROINDUSTRIAL",
    "ABREVIATURA": "DA",
    "NETWORKS": "",
    "FORMA DE CONEXION": "",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "LABORATORIO DE AGROINDUSTRIAL",
    "ABREVIATURA": "LA",
    "NETWORKS": "172.17.67.9/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "DIRECCION DE ASUNTOS ACADEMICOS",
    "ABREVIATURA": "DAA",
    "NETWORKS": "172.17.2.5/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "3ER PISO",
    "DESCRIPCION": "DA-CIENCIAS BASICAS",
    "ABREVIATURA": "DCB",
    "NETWORKS": "172.17.60.5/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "3ER PISO",
    "DESCRIPCION": "DA-FORESTAL",
    "ABREVIATURA": "DF",
    "NETWORKS": "",
    "FORMA DE CONEXION": "",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "3ER PISO",
    "DESCRIPCION": "LABORATORIO DECOMPUTO DE FORESTAL",
    "ABREVIATURA": "LCF",
    "NETWORKS": "10.10.9.5/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "4TO PISO",
    "DESCRIPCION": "DA-ECOTURISMO",
    "ABREVIATURA": "DE",
    "NETWORKS": "172.17.64.33/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "4TO PISO",
    "DESCRIPCION": "LABORATORIO DE ECOTURISMO",
    "ABREVIATURA": "LE",
    "NETWORKS": "172.17.64.13/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON A",
    "UIBICACION": "4TO PISO",
    "DESCRIPCION": "OFICINA DE GESTION DE CALIDAD",
    "ABREVIATURA": "OGC",
    "NETWORKS": "172.17.21.13/24",
    "FORMA DE CONEXION": "PUNTO DE RED",
    "COLOR": "blue"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "DP. ACAD. DE MEDICINA VETERINARIA",
    "ABREVIATURA": "DAMV",
    "NETWORKS": "40.0.8.75/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "ESCUELA PROF. DE ENFERMERIA",
    "ABREVIATURA": "EPE",
    "NETWORKS": "172.17.66.4/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "1ER PISO",
    "DESCRIPCION": "VICERRECTORADO ACADEMICO",
    "ABREVIATURA": "VRA",
    "NETWORKS": "172.17.50.61/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "DEPARTAMENTO ACADEMICO ING. SISTEAMS E INFORMATICA",
    "ABREVIATURA": "DAISI",
    "NETWORKS": "172.17.68.3/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "ESCUELA PROF. DE ING.SISTEMAS E INFORMATICA",
    "ABREVIATURA": "EPISI",
    "NETWORKS": "172.17.68.6/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "LABORATORIO ING. SISTEMAS E INFORMATICA",
    "ABREVIATURA": "LISI",
    "NETWORKS": "40.0.11.92/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "LABORATORIO DE REDES - ING SISTEMAS",
    "ABREVIATURA": "LRISI",
    "NETWORKS": "",
    "FORMA DE CONEXION": ""
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "LABORATIRIO DE ROBOTICA - ING SISTEMAS",
    "ABREVIATURA": "LBISI",
    "NETWORKS": "",
    "FORMA DE CONEXION": ""
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "FACULTAD DE INGENIERIA",
    "ABREVIATURA": "FI",
    "NETWORKS": "40.0.0.214",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "ESCUELA PROF. DERECHO Y CIENCIAS POLITICAS",
    "ABREVIATURA": "EPDC",
    "NETWORKS": "40.0.2.94/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "2DO PISO",
    "DESCRIPCION": "LABORATARIO DE COMP. DERECHO DE CIENCIAS POLITICAS",
    "ABREVIATURA": "LCCP",
    "NETWORKS": "172.17.63.12/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "3ER PISO",
    "DESCRIPCION": "DIRECCION DE DEPARTAMENTO DE CONTABILIDAD Y ADMINISTRACION",
    "ABREVIATURA": "DDCA",
    "NETWORKS": "40.0.3.138/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "3ER PISO",
    "DESCRIPCION": "EP. DE CONTABILIDAD",
    "ABREVIATURA": "EPC",
    "NETWORKS": "172.17.62.8/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "3ER PISO",
    "DESCRIPCION": "LABORATORIO DE ADMINISTRACION Y NEGOCIOS INTERNACIONALES",
    "ABREVIATURA": "LANI",
    "NETWORKS": "172.17.62.9/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "3ER PISO",
    "DESCRIPCION": "LABORATORIO DE CONTABILIDAD  Y FINANZAS",
    "ABREVIATURA": "LCF",
    "NETWORKS": "10.10.2.14/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "4TO PISO",
    "DESCRIPCION": "DECANATURA DE EDUCACION",
    "ABREVIATURA": "DE",
    "NETWORKS": "172.17.65.9/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  },
  {
    "ZONA": "PABELLON B",
    "UIBICACION": "4TO PISO",
    "DESCRIPCION": "LABORATORIO DE EDUCACION PRIMARIA",
    "ABREVIATURA": "LEP",
    "NETWORKS": "10.10.5.142/24",
    "FORMA DE CONEXION": "PUNTO DE RED"
  }
]

const DemoRadialGraph = () => {
  const chartRef = useRef();
  const RadialData = {
    nodes: [
      {
        id: '0',
        label: 'UNAMAD',
  
      },
      {
        id: '1',
        label: 'ADMINISTRATIVA',
      },
      {
        id: '2',
        label: 'BIBLIOTECA',
        style:{
          fill: 'red',
        }
      },
      {
        id: '3',
        label: 'PABELLON A',
        style:{
          fill: 'blue',
        }
      },
      {
        id: '4',
        label: 'PABELLON B',
      },
    ],
    edges: [
      {
        source: '0',
        target: '1',
      },
      {
        source: '0',
        target: '2',
      },
      {
        source: '0',
        target: '3',
      },
      {
        source: '0',
        target: '4',
      },
    ],
  };

  const fetchData = (node) => {
    const label = node.label;
    const filtered = objJson.filter(item =>
      item.ZONA.includes(label)
    );
    console.log(filtered)
    if(node.id !=0){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            nodes: [
              {
                ...node,
              },
            ].concat(
              filtered.map((res,index) => {
                return {
                  id: `${node.id}-${index}`,
                  label: res.NETWORKS,
                  style: {
                    fill: res.COLOR,
                    stroke: 'red',
                  },
                };
              }),
            ),
            edges: filtered.map((res,index) => {
              return {
                source: node.id,
                target: `${node.id}-${index}`,
              };
            }),
          });
        }, 1000);
      });
    }
  };

  const asyncData = async (node) => {
    return await fetchData(node);
  };

  const config = {
    data: RadialData,
    autoFit: false,
    layout: {
      unitRadius: 150,
      /** 节点直径 */
      nodeSize: 20,
      /** 节点间距 */
      nodeSpacing: 80,
    },
    nodeCfg: {
      asyncData,
      // size: [100,40],
      size:40,
      // type: 'rect',
      // // style: {
      //   fill: 'red',
      //   stroke: 'red',
      // // },
      labelCfg: {
        style: {
          fontSize: 8,
          fill: '#000',
        },
      },
    },
    menuCfg: {
      customContent: (e) => {
       console.log(e)
        return (
         <div style={{display:'flex', flexDirection:'column'}}>
          <span>asdasdasd</span>
          <span>asdasdasd</span>
          <span>asdasdasd</span>
          <span>asdasdasd</span>
          <span>asdasdasd</span>
         </div>
        );
      },
    },
    edgeCfg: {
      style: {
        lineWidth: 1,
      },
      endArrow: {
        d: 20,
        size: 2,
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    onReady: (graph) => {
      // chartRef.current = graph;
      // graph.on('node:mouseover', (evt) => {
      //  console.log("hover")
      // });
    },
  };

  return (
  <div style={{width:'auto', height:'auto'}}>
    <RadialGraph {...config}
    
    />
    </div>);
};


export default DemoRadialGraph;
