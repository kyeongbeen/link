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
import { useUser } from "./UserContext"


const Login = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // UserContext 사용
  const { login } = useUser();

  // 로그인 요청 및 response return
  const postLogin = async (loginData) => {
    const formData = new FormData();
    formData.append("username", loginData.email);
    formData.append("password", loginData.password);
    const URL = "http://localhost:8080/login";
    const response = await fetch(URL, {
        method: 'POST',
        cache: 'no-cache',
        body: formData
      });
    if (!response.ok) {
      throw new Error("아이디 또는 비밀번호를 다시 입력해주세요!");
    }

    // 로그인 정보 return
    return response.json();
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };


  // 로그인 버튼 클릭시 실행되는 event
  // 로그인 성공, 실패를 알려주는 부분
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    try {
      const response = await postLogin(loginData);
      login(response);
      navigate("/main");
    } catch (error) {
      alert(error);
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
