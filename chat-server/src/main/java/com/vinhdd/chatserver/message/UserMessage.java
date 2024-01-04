package com.vinhdd.chatserver.message;

import lombok.*;

import java.util.Date;
import java.util.UUID;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMessage {
    UUID senderId;
    UUID recipientId;
    String content;
    UserMessageType type;
    Date timestamp;
}
