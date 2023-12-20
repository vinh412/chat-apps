package com.vinhdd.chatapi.channel.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChannelResponse {
    private Long id;
    private String name;
    private List<MemberResponse> members;
    private List<MessageResponse> messages;
    private LocalDateTime dateCreated;
}

