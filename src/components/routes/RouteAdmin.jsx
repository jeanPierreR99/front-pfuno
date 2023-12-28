import React, { useState,useEffect } from 'react';
import {
  CustomerServiceOutlined,
  DeploymentUnitOutlined,
  GroupOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RotateRightOutlined,
  ScheduleOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Routes, Route, useNavigate } from "react-router-dom";
import TableCampus from "../admin/TableCampus.jsx";
import TableDependence from "../admin/TableDependence";
import ProfilePersonal from "../admin/ProfilePersonal";
import TableRoles from "../admin/TableRoles";
import TableEquipment from "../admin/TableEquipment";
import TableBinnacle from "../admin/TableBinnacle";
import { useLogin, useRole } from "../routes/context/Context.provider";
import logo from '../../assets/logo_unamad.png';
import DefaultPage from '../undefinded/Undefined';
import HomeClient from '../client/HomeCliente';
import Tick from '../client/Tick.jsx';
import Request from '../admin/Request.jsx';

const { Header, Sider, Content } = Layout;

function RouteAdmin() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {setIsLogin} = useLogin();
  const {setIsAdmin} = useRole();
  const [user, setUser] = useState({})

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const closeSession = () => {
    localStorage.clear();
    setIsLogin(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const getStorage = () => {
    const objStorage = localStorage.getItem("user");
    if (objStorage) {
      const objParse = JSON.parse(objStorage);
      console.log(objParse)
      setUser(objParse)
    }
  };
  useEffect(() => {
    getStorage();
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{background:"white", minHeight:"100vh"}}>
        <div className='content-desc' style={{display:collapsed?'none':''}}>
          <img src={logo} alt="logo" className='image-logo' />
          <span className="name-user">{user&&user.user}</span>
          <span className="name-role">{user&&user.role}</span>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{background:"white", height:"auto"}}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Inicio',
              onClick: ()=>{navigate("/admin")}
            },
            {
              key: '2',
              icon: <ScheduleOutlined />,
              label: 'Sedes',
              onClick: ()=>{navigate("/admin/campus")}
            },
            {
              key: '3',
              icon: <DeploymentUnitOutlined />,
              label: 'Dependencias',
              onClick: ()=>{navigate("/admin/dependence")}
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: 'Personas',
              onClick: ()=>{navigate("/admin/profile-personal")}
            },
            {
              key: '5',
              icon: <UserSwitchOutlined />,
              label: 'Roles y Privilegios',
              onClick: ()=>{navigate("/admin/roles")}
            },
            {
              key: '6',
              icon: <GroupOutlined />,
              label: 'Equipos informáticos',
              onClick: ()=>{navigate("/admin/equipment")}
            },
            {
              key: '7',
              icon: <CustomerServiceOutlined />,
              label: 'Solicitud de soporte',
              onClick: ()=>{navigate("/admin/request")}
            },
            {
              key: '8',
              icon: <RotateRightOutlined />,
              label: 'Bitácora',
              onClick: ()=>{navigate("/admin/binnacle")}
            },
            {
              key: '9',
              icon: <LogoutOutlined />,
              label: 'Cerrar sesión',
              style:{color:"red", opacity:'.8'},
              onClick: ()=>{closeSession()}
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
             <Routes>
        <Route path="/admin" element={<HomeClient />} />
        <Route path="/admin/campus" element={<TableCampus />} />
        <Route path="/admin/dependence" element={<TableDependence />} />
        <Route path="/admin/profile-personal" element={<ProfilePersonal />} />
        <Route path="/admin/roles" element={<TableRoles />} />
        <Route path="/admin/equipment" element={<TableEquipment />} />
        <Route path="/admin/request" element={<Request />} />
        <Route path="/admin/binnacle" element={<TableBinnacle />} />
        <Route path="*" element={<DefaultPage />}></Route>
      </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default RouteAdmin;
