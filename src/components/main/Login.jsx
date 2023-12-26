import React, { useState } from "react";
import { API_URL, ROLE } from "../../constants";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useLogin, useRole } from "../routes/context/Context.provider";
import logo_horizontal from "../../assets/logo_horizontal.png"

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { setIsLogin } = useLogin();
  const { setIsAdmin } = useRole();
  const onFinish = (values) => {
    console.log(values);
    handleLogin(values.username, values.password);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleStorage = (user, token, role) => {
    const userStorage = {
      user: user,
      token: token,
      role: role,
    };
    localStorage.setItem("user", JSON.stringify(userStorage));
  };

  const handleLogin = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      console.log(response.data.data);
      if (response.data.data) {
        handleStorage(
          response.data.data.username,
          response.data.data.access_token,
          response.data.data.role
        );
        setIsLogin(true);
        if (
          response.data.data.role == ROLE[0] ||
          response.data.data.role == ROLE[1]
        ) {
          setIsAdmin(true);
          navigate("/admin")
        } else {
          navigate("/support")
        }
      }
      else{
        setError(true)
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <center className="content-login">
      <div className="img-absolute"></div>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
       <img src={logo_horizontal} className="img-logo-horizontal" alt="" />
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {error && (
        <p style={{ color: "red", opacity: ".7" }}>
          Credenciales Incorrectas.
        </p>
      )}
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Recordarme</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Olvidaste tu contraseña
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Ingresar
        </Button>
        O <a href="">Registrarse!</a>
      </Form.Item>
    </Form>
    </center>
  );
};
export default Login;
