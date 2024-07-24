package com.vinhdd.chatapi.payload.response;

import com.vinhdd.chatapi.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private UUID id;
    private String email;
    private String username;
    private String firstname;
    private String lastname;
    private Role role;
}
