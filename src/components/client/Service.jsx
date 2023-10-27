import React, { useState } from 'react';
import { Card, List, Avatar, Modal } from 'antd';
import User from './User';
const data = [
  {
    title: 'Servicio 1',
  },
  {
    title: 'Servicio 2',
  },
  {
    title: 'Servicio 3',
  },
  {
    title: 'Servicio 4',
  },
  {
    title: 'Servicio 5',
  },
  {
    title: 'Servicio 6',
  },
  {
    title: 'Servicio 6',
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
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title} className='card' onClick={()=>{showModal(item.title)}}>
        
          <Avatar size={60}  src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
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