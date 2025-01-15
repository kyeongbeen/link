package com.example.link.User.service;

import com.example.link.User.dto.CustomUserDetails;
import com.example.link.User.entity.User;
import com.example.link.User.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    // 변수이름 username, password 와 똑같이 사용
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        log.info("user:{}", user.getUserName());
        log.info("user:{}", user.getPassword());
        if( user != null ){
            return new CustomUserDetails(user);
        }
        return null;
    }
}
