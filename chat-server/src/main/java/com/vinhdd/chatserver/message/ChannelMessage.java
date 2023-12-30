package com.vinhdd.chatserver.message;

import com.vinhdd.chatserver.counter.Counter;
import com.vinhdd.chatserver.counter.CounterRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.Date;

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
    private Long userId;
    @Column("content")
    private String content;
    @Column("type")
    private ChannelMessageType type;
    @Column("timestamp")
    private Date timestamp;

}
