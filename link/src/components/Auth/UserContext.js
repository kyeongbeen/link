import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"; // jwt-decode 라이브러리 추가

// UserContext 생성
const UserContext = createContext();

// UserContext provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// userName을 사용하는 custom hook
export const useUser = () => {
  return useContext(UserContext);
};
