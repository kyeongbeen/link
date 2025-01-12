import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"; // jwt-decode 라이브러리 추가

// Context 생성
const UserContext = createContext();
const ProjectIdContext = createContext();

// UserEmail을 담는 컴포넌트
export const UserProvider = ({ children }) => {

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.userName); // 토큰에서 userName 추출
        console.log('토큰 디코딩 성공:', decoded.userName);
      } catch (err) {
        console.error('토큰 디코딩 실패:', err);
      }
    }
  }, []); 
  
  const [user, setUser] = useState(null);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);


  return (
    <UserContext.Provider value={{ user, userName,login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// userName을 사용하는 커스텀 훅 
export const useUser = () => {
  return useContext(UserContext);
};

// ProjectIdProvider 컴포넌트
export const ProjectIdProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);

  // projectId를 설정하는 함수 (외부에서 호출 가능)
  const updateProjectId = (id) => {
    setProjectId(id);
  };

  return (
    <ProjectIdContext.Provider value={{ projectId, updateProjectId }}>
      {children}
    </ProjectIdContext.Provider>
  );
};

// projectId와 updateProjectId를 사용하는 커스텀 훅
export const useProjectId = () => {
  return useContext(ProjectIdContext);
};
