package com.vinhdd.chatapi.payload.response;

import com.vinhdd.chatapi.model.MessageKey;
import com.vinhdd.chatapi.model.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
    private MessageKey key;
    private UUID userId;
    private String content;
    private MessageType type;
    private Date timestamp;
}
