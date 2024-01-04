package com.vinhdd.chatapi.auth;

import com.vinhdd.chatapi.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private UUID id;
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
    private String token;
}
