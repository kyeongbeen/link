package com.example.link.User.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
public class SignupDTO {
    private String userName;
    private String email;
    private String password;
}
