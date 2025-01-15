package com.example.link.User.service;

import com.example.link.User.dto.LoginDTO;
import com.example.link.User.dto.SignupDTO;
import com.example.link.User.dto.UserDTO;
import com.example.link.User.dto.UserListDTO;
import com.example.link.User.entity.User;
import com.example.link.User.repository.UserRepository;
import com.example.link.Project.entity.ProjectParticipants;
import com.example.link.Project.repository.ProjectParticipantsRepository;
import com.example.link.security.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ProjectParticipantsRepository projectParticipantsRepository;
    private final JwtUtil jwtUtil;

    public List<UserListDTO> getUserLists(int projectId) {
        List<UserListDTO> userListDTOs = new ArrayList<>();
        List<ProjectParticipants> participants = projectParticipantsRepository.findAllByProject_ProjectId(projectId);
        for (ProjectParticipants participant : participants) {
            userListDTOs.add(UserListDTO.builder()
                            .userId(participant.getUser().getUserId())
                            .userName(participant.getUser().getUserName())
                            .email(participant.getUser().getEmail())
                    .build());
        }
        return userListDTOs;
    }

    public UserDTO signup(SignupDTO signupDTO) {
        User user = User.builder()
                .userName(signupDTO.getUserName())
                .email(signupDTO.getEmail())
                .password(bCryptPasswordEncoder.encode(signupDTO.getPassword()))
                .role("ROLE_USER")
                .build();
        userRepository.save(user);
        return UserDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }


    public String logout(String email) {
        User user = userRepository.findByEmail(email);
        if(user.getToken() != null && !jwtUtil.isTokenExpired(user.getToken())) {
            jwtUtil.expireToken(user.getToken());

            for (String token : jwtUtil.getExpiredTokens()) {
                log.info(token);
            }
            user.setToken(null);
        }
        return "로그아웃 되었습니다.";

    }
}
