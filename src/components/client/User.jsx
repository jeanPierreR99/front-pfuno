import React, { useState } from 'react';
import { Avatar, List, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Status from './Status';
const data = [
  {
    name: 'jean pierre',
    description: 'Soporte'
  },
  {
    name: 'luis angel',
    description: 'Soporte'
  },
  {
    name: 'jefferson',
    description: 'Soporte'
  },
  {
    name: 'nick',
    description: 'Soporte'
  },
  
];
const User = ({fed, setUser, file, setFile}) => {

  const [clic, setClic] = useState(null);

  // const [fileList, setFileList] = useState([]);
  const props = {
    maxCount:1,
    onRemove: (file) => {
      
      setFile([])
    },
    beforeUpload: (value) => {
      setFile([value]);
   
      return false;
    },
    file,
  };

  const handleClick = (index, name) => {
    setClic(index);
    setUser(name)
  };
  const otro = ()=>{
    console.log("otrooooooo")
  }

  return <div><List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item className='item' style={clic == index ? {border:'1px #a8a8bf solid', borderRadius:'10px', backgroundColor:'#e6e8f5', paddingRight:'10px', paddingLeft:'20px'}: {backgroundColor: 'transparent'}}  onClick={() => fed?handleClick(index, item.name):otro }>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<label style={{cursor:'pointer'}}>{item.name}</label>}
          description={<label style={{cursor:'pointer'}}>{item.description}</label>}
        />
      </List.Item>
    )}
  />
  <br />
  <br />
  <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
  </div>
    };
export default User;