package com.vinhdd.chatserver.message;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.*;

import java.util.Date;
import java.util.UUID;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table("channel_message")
public class ChannelMessage {
    @PrimaryKey
    private ChannelMessageKey key;
    @Column("user_id")
    private UUID userId;
    @Column("content")
    private String content;
    @Column("type")
    private ChannelMessageType type;
    @Column("timestamp")
    private Date timestamp;
}
