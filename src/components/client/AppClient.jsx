import React from 'react';
import { Col, Row } from 'antd';
import Tick from './Tick';
import Service from './Service';
import Status from './Status';
const AppAdmin = () => (
  <div className='content'>
  <Row gutter={16}>
    <Col md={11} lg={7} sm={12} xs={24} style={{ marginBottom: '16px' }}>
    <Tick></Tick>
    </Col>
    <Col md={13} lg={17} sm={12} xs={24}>
    <Service></Service>
    </Col>
  </Row>
  <div style={{padding:'10px'}}>
  <Status></Status>
  </div>
  </div>
);

export default AppAdmin;