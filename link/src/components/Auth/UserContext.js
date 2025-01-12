import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"; // jwt-decode 라이브러리 추가

// UserContext 생성
const UserContext = createContext();

// UserContext provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.userName); // 토큰에서 userName 추출
      } catch (err) {
        console.error('토큰 디코딩 실패:', err);
      }
    }
  }, []); // 처음 렌더링 시 한 번만 실행

  return (
    <UserContext.Provider value={{ userName }}>
      {children}
    </UserContext.Provider>
  );
};

// userName을 사용하는 custom hook
export const useUser = () => {
  return useContext(UserContext);
};
