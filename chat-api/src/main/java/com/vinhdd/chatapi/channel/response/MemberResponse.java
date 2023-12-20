package com.vinhdd.chatapi.channel.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponse {
    private Long id;
    private String email;
    private String firstname;
    private String lastname;
    private LocalDateTime joiningDate;
}
