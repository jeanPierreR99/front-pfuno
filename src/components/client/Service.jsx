import React, { useState } from 'react';
import { Card, List, Avatar, Modal } from 'antd';
import User from './User';
const data = [
  {
    title: 'Soporte de Impresoras',
    description: 'Servicio técnico especializado en la resolución de problemas relacionados con impresoras, desde problemas de conectividad hasta mantenimiento y reparaciones.',
  },
  {
    title: 'Asistencia en Redes',
    description: 'Soluciones y ayuda para configuración, optimización y resolución de problemas en redes informáticas, asegurando su estabilidad y funcionamiento adecuado.',
  },
  {
    title: 'Recuperación de Datos',
    description: 'Servicio de recuperación de información y archivos perdidos debido a fallos técnicos, eliminación accidental o problemas de almacenamiento.',
  },
  {
    title: 'Seguridad Informática',
    description: 'Implementación de medidas y soluciones para proteger sistemas y datos contra amenazas, incluyendo antivirus, firewalls y análisis de vulnerabilidades.',
  },
  {
    title: 'Mantenimiento Preventivo',
    description: 'Revisiones periódicas y mantenimiento preventivo de equipos informáticos para prevenir fallos y asegurar un rendimiento óptimo a largo plazo.',
  },
  {
    title: 'Optimización de Sistemas',
    description: 'Servicio para mejorar el rendimiento y la eficiencia de sistemas informáticos mediante ajustes, actualizaciones y optimización de recursos.',
  },
  {
    title: 'Consultoría Tecnológica',
    description: 'Asesoramiento especializado en la implementación de tecnologías para mejorar procesos y optimizar el uso de herramientas informáticas.',
  },
];


const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
};
const success = () => {
  Modal.success({
    content: 'Felicitaciones su ticket ha sido generado',
  });
};
const error = () => {
  Modal.error({
    title: 'Mensaje de error',
    content: 'Ocurrio un error inesperado',
  });
};
const warning = () => {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
};


const Service = () => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [service, setService] = useState("")
  const [user, setUser] = useState("")
  const [file, setFile] = useState([])

  const showModal = (value) => {
    setService(value)
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      sendService()
      setOpen(false);
      setConfirmLoading(false);
      success()
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const sendService = ()=>{
    console.log(service)
    console.log(user)
    console.log(file[0])
    console.log("------------")
  }

  return <div className='contentTask'>
      <div className="flex" style={{marginBottom:'20px'}}>
      <span style={{color:'blue', opacity:'.7'}}>Servicios</span>
        </div>
  <List
    grid={{
      gutter: 16,
      xs: 2,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 4,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <Card title={item.title} className='card' onClick={() => showModal(item.title)}>
        <Avatar size={80} src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
          <p className='spam-title'>{item.description}</p> {/* Agregamos la descripción */}
        </Card>
      </List.Item>
    )}
  />
  <Modal
        title={`${service}: Escoja un personal y suba una imagen`}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       <User fed={34} setUser={setUser} file={file} setFile={setFile}></User>
      </Modal>
  </div>
};
export default Service;