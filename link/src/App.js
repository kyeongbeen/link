import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* 로그인 페이지 */}
        <Route path="/register" element={<Register />} /> {/* 회원가입 페이지 */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* 대시보드 페이지 */}
      </Routes>
    </Router>
  );
};

export default App;
