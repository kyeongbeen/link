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

const Login = () => {
  const theme = createTheme();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  // 동의 체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };
  // 로그인 성공 시 대시보드 페이지로 이동 (로그인 로직 미구현)
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/main");
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
