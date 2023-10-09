import React, { useState } from 'react';
import { Avatar, List } from 'antd';
const data = [
  {
    name: 'User 1',
    description: 'Soporte'
  },
  {
    name: 'User 2',
    description: 'Soporte'
  },
  {
    name: 'User 3',
    description: 'Soporte'
  },
  {
    name: 'User 4',
    description: 'Soporte'
  },
  
];
const User = ({fed}) => {

  const [clic, setClic] = useState(null);

  const handleClick = (index) => {
    setClic(index);
  };
  const otro = ()=>{
    console.log("otrooooooo")
  }

  const estilo = {
    
  };

  return <div><List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item className='item' style={clic == index ? {border:'1px #a8a8bf solid', borderRadius:'10px', backgroundColor:'#e6e8f5', paddingRight:'10px', paddingLeft:'20px'}: {backgroundColor: 'transparent'}}  onClick={() => fed?handleClick(index):otro }>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<label style={{cursor:'pointer'}}>{item.name}</label>}
          description={<label style={{cursor:'pointer'}}>{item.description}</label>}
        />
      </List.Item>
    )}
  />
  </div>
    };
export default User;