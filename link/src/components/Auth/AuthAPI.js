import axios from 'axios';

// Axios 인스턴스 생성
const AuthAPI = axios.create({
  baseURL: 'http://localhost:8080',  // API 서버의 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
AuthAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // 로컬 스토리지에서 token 가져오기
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // 헤더에 Authorization 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AuthAPI;
