import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const Login = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 로그인 요청
  const login = async ({ email, password }) => {
    try {
      // 폼 데이터 형식으로 변환
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      // API 호출
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );

      if (response.data && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        throw new Error("token이 응답에 포함되어 있지 않습니다.");
      }
    
      alert("로그인에 성공했습니다.");
      // 응답 데이터 반환
      return response.data;
    } catch (error) {
      console.error("로그인 실패:", error.response || error.message);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    try {
      const response = await login(loginData);
      localStorage.setItem("tokenType", response.tokenType);
      localStorage.setItem("token", response.token);  // token을 로컬 스토리지에 저장
      navigate("/main") // 리디렉션은 상태가 변경된 후에 이루어져야 함
    } catch (error) {
      console.log(error);
    }
  };

  // 회원가입 페이지 이동
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "gray", // 전체 배경을 회색으로
          minHeight: "100vh", // 화면 전체 높이
          display: "flex", // 컨테이너를 가운데 정렬
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "600px",
              bgcolor: "white", // 컨테이너 배경 흰색
              borderRadius: "8px",
              boxShadow: 20,
              padding: "15px",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              marginTop="60px"
              fontWeight={700}
            >
              로그인
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 5 }}
            >
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      autoFocus
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                      value={loginData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호"
                      value={loginData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontWeight: "bold",
                    color: "black",
                    backgroundColor: "orange",
                    "&:hover": { backgroundColor: "darkorange" }, // 커서 올라 갈 때 좀 더 어두운 주황색
                  }}
                  size="large"
                >
                  로그인
                </Button>
                <Button
                  onClick={handleRegister}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 0,
                    mb: 2,
                    fontWeight: "bold",
                    backgroundColor: "lightgray",
                    "&:hover": { backgroundColor: "gray" }, // 커서 올라 갈 때 좀 더 어두운 회색
                  }}
                  size="large"
                >
                  회원가입
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
