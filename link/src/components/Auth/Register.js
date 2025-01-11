import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

// 회원가입 컴포넌트
export const Register = () => {
  const navigate = useNavigate();
  const theme = createTheme();
  const [signData, setSignData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  // 회원가입 요청
  const signUp = async ({ email, userName, password }) => {
    const data = { email, userName, password };
    try {
      const response = await axios.post("http://localhost:8080/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  };

  // 입력값 변경 시
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignData({ ...signData, [name]: value });
  };

  // 폼 전송
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로딩 방지
    try {
      await signUp(signData);
      alert("회원가입이 완료되었습니다.");
      navigate("/"); 
    } catch (error) {
      
      console.error("Sign up failed", error);
    }
  };

  // 로그인 페이지로 이동
  const handleLogin = () => {
    navigate("/"); 
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "gray", // 전체 배경을 회색
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
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "650px",
              bgcolor: "white",
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
              회원가입
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
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
                      value={signData.email}
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
                      value={signData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      label="비밀번호 재입력"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="userName"
                      name="userName"
                      label="이름"
                      value={signData.userName}
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
                    backgroundColor: "lightgray",
                    "&:hover": { backgroundColor: "gray" },
                  }}
                  size="large"
                >
                  회원가입
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 0,
                    mb: 2,
                    fontWeight: "bold",
                    color: "black",
                    backgroundColor: "orange",
                    "&:hover": { backgroundColor: "darkorange" },
                  }}
                  size="large"
                  onClick={handleLogin}
                >
                  로그인으로 돌아가기
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
