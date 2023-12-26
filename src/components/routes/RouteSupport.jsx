import React, { useEffect, useState } from "react";
import {
  CustomerServiceOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppClient from "../client/AppClient";
import { useLogin, useRole } from "../routes/context/Context.provider";
import logo from "../../assets/logo_unamad.png";
import Tick from "../client/Tick";
import DefaultPage from "../undefinded/Undefined";
import HomeClient from "../client/HomeCliente";

const { Header, Sider, Content } = Layout;

function RouteSupport() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { setIsLogin } = useLogin();
  const { setIsAdmin } = useRole();
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
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "white", minHeight: "100vh" }}
      >
        <div
          className="content-desc"
          style={{ display: collapsed ? "none" : "" }}
        >
          <img src={logo} alt="logo" className="image-logo" />
          <span className="name-user">{user&&user.user}</span>
          <span className="name-role">{user&&user.role}</span>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: "white", height: "auto" }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Inicio",
              onClick: () => {
                navigate("/support");
              },
            },
            {
              key: "2",
              icon: <HistoryOutlined />,
              label: "Historial",
              onClick: () => {
                navigate("/support/history");
              },
            },
            {
              key: "3",
              icon: <CustomerServiceOutlined />,
              label: "Servicios",
              onClick: () => {
                navigate("/support/services");
              },
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Cerrar sesión",
              style:{color:"red", opacity:'.8'},
              onClick: () => {
                closeSession();
              },
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
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/support" element={<HomeClient />} />
            <Route path="/support/history" element={<Tick />} />
            <Route path="/support/services" element={<AppClient />} />
            <Route path="*" element={<DefaultPage />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
export default RouteSupport;
