package com.vinhdd.chatapi.channel.response;

import com.vinhdd.chatapi.message.MessageKey;
import com.vinhdd.chatapi.message.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
    private MessageKey key;
    private Long userId;
    private String content;
    private MessageType type;
    private Date timestamp;
}
