package com.vinhdd.chatapi.message;

import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MessageKey {
    private Long channelId;
    private Long messageId;
}
