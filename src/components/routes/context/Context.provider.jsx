import { createContext, useContext, useState } from "react";

const LoginContext = createContext();
const RoleContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const RoleProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
  
    return (
      <RoleContext.Provider value={{ isAdmin, setIsAdmin }}>
        {children}
      </RoleContext.Provider>
    );
  };

export const useLogin = () => useContext(LoginContext)
export const useRole = () => useContext(RoleContext)

