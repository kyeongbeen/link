import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectIdContext = createContext();
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
  