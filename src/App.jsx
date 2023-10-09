import React from 'react';
import { Button, Col, Row, Space } from 'antd';
import Task from './components/Task';
import Tick from './components/Tick';
import Status from './components/Status';
import Header from './components/Header';
import TableAnt from './components/Table';

const App = () => (
  <div className='content'>
    <Header></Header>
  <Row className="App app" gutter={16}>
    <Col md={11} lg={7} sm={12} xs={24} style={{ marginBottom: '16px' }}>
    <Tick></Tick>
    </Col>
    <Col md={13} lg={17} sm={12} xs={24}>
    <Task></Task>
    </Col>
  </Row>
  <div style={{padding:'10px'}}>
  <TableAnt></TableAnt>
  <Status></Status>
  </div>
  </div>
);

export default App;