package com.vinhdd.chatapi.response;

import com.vinhdd.chatapi.channel.Role;
import com.vinhdd.chatapi.channel.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponse {
    private UUID id;
    private String email;
    private String firstname;
    private String lastname;
    private Role role;
    private Status status;
    private LocalDateTime joiningDate;
}
