import React from 'react';
import { Avatar, Button, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MenuList from '../admin/MenuList';
const Header = () => {
 
  return (
    <div className='header'>
      <span>Jefferson Morales</span>
       <Avatar size="large" icon={<UserOutlined />} />
       <MenuList />
    </div>
  );
};
export default Header;