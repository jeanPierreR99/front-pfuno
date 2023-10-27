import React from 'react';
import { Button, notification } from 'antd';
const Status = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Estado del soporte',
      description:
        'Su soporte ha sido aceptado en unos momentos llegara nuestro personal',
      duration: 0,
    });
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Notificacion para mostrar
      </Button>
    </>
  );
};
export default Status;