package com.example.link.User.controller;


import com.example.link.User.dto.*;
import com.example.link.User.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping
@RequiredArgsConstructor
@Tag(name = "User", description = "유저 API")
public class UserController {

    private final UserService userService;

    @GetMapping("/user/lists")
    @Operation(summary = "프로젝트에 있는 사용자 전원 조회")
    public ResponseEntity<List<UserListDTO>> getUserLists(@RequestParam int projectId) {
        return new ResponseEntity<>(userService.getUserLists(projectId), HttpStatus.OK);
    }

    @PostMapping("/signup")
    @Operation(summary = "회원가입")
    public ResponseEntity<UserDTO> signup(@RequestBody SignupDTO signupDTO) {
        return new ResponseEntity<>(userService.signup(signupDTO), HttpStatus.OK);
    }

    @PatchMapping("/logout")
    @Operation(summary = "로그아웃")
    public ResponseEntity<String> logout(@RequestParam String email) {
        return new ResponseEntity<>(userService.logout(email), HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인",
            description = "requestbody가 아닌 form data 형태로 데이터 전송해야함\n" +
                    "\nusername 에는 email, password 에는 해당유저의 password 입력")
    public void login(@RequestBody LoginDTO loginDTO) {}

    @PostMapping("/loginReturnValue")
    @Operation(summary = "로그인 리턴값, API 호출해도 아무런 값 출력하지 않음",
    description = "password : 백엔드쪽 코드에서 bcrypt를 사용해서 해쉬값이 반환 \n\n" +
            "token : Bearer 토큰기반 값 반환\n\n" +
            "role : ROLE_USER 가 할당된 사용자\n\n" +
            "role = ROLE_USER, token 이 있는 사용자만 /login, /signup 외의 api 를 호출가능")
    public void loginReturnValue(@RequestBody LoginReturnValueDTO loginReturnValueDTO) {}

}
