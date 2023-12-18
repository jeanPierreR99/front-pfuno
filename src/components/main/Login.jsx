import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleStorage = (user, token, role)=>{
    const userStorage = {
      user: user,
      token: token,
      role: role
    };
    localStorage.setItem('user', JSON.stringify(userStorage));
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      console.log(response.data.data)
      handleStorage(response.data.data.username, response.data.data.access_token, response.data.data.role)
      // navigate("/admin");

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <div>
          <label htmlFor="email">Usuario:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
