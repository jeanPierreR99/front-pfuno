import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: 'Perfil',
    key: '0',
  },
  {
    label: 'otro',
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Salir',
    key: '3',
  },
];
const MenuList = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default MenuList;
