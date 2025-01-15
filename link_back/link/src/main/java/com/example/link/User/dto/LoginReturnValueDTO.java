package com.example.link.User.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class LoginReturnValueDTO {
    private int userId;
    private String userName;
    private String email;
    private String password;
    private String token;
    private String role;
}
