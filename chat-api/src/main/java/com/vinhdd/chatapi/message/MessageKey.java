package com.vinhdd.chatapi.message;

import lombok.*;

import java.util.UUID;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MessageKey {
    private UUID channelId;
    private UUID messageId;
}
