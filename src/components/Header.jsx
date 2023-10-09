import React from 'react';
import { Avatar, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Header = () => {
 
  return (
    <div className='header'>
      <span>Reyes frisancho jean pierre</span>
       <Avatar size="large" icon={<UserOutlined />} />
    </div>
  );
};
export default Header;