import React from 'react';
import { Col, Row } from 'antd';
import Tick from './Tick';
import Service from './Service';
import Status from './Status';
import DemoConversionDagreGraph from '../graph/Graph';
import DemoDecompositionTreeGraph from '../graph/Graph';
const AppClient = () => (
  <div className='content'>

    <Service></Service>
  
  <div style={{padding:'10px'}}>
  <Status></Status>
  </div>
  </div>
);

export default AppClient;