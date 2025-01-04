import React, { createContext, useContext, useState } from "react";

/*
    AuthProvider 컴포넌트는 인증 상태를 관리하는 컴포넌트
    - user: 현재 사용자 정보
    - register: 회원가입 함수
    - login: 로그인 함수
    - logout: 로그아웃 함수
    추후 구현 예정, API 호출 부분은 console.log로 대체
*/

// AuthContext 생성
const AuthContext = createContext();

// AuthContext를 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);

// 인증 상태를 관리하는 컴포넌트
export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null); 

    // 회원가입 함수
    const register = async (email, password) => {
        console.log("회원가입 API 호출: ", { email, password });
        setUser({ email }); // 예시 사용자 설정
    };

    // 로그인 함수
    const login = async (email, password) => {
        console.log("로그인 API 호출:", { email, password });
        if (email === "test@example.com" && password === "password") {
            setUser({ email });
        } else {
            throw new Error("잘못된 이메일 또는 비밀번호");
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        console.log("로그아웃 API 호출");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children} 
        </AuthContext.Provider>
    );
};
