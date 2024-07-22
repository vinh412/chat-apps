package com.vinhdd.chatapi.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {
    @NotEmpty(message = "email can not empty")
    @Email(message = "invalid email")
    private String email;
    @NotEmpty(message = "password can not empty")
    private String password;
    private boolean rememberMe;
}
