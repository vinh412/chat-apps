package com.vinhdd.chatserver.message;

import lombok.*;
import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

import java.io.Serializable;
import java.util.UUID;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@PrimaryKeyClass
public class ChannelMessageKey implements Serializable {
    @PrimaryKeyColumn(name = "channel_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private UUID channelId;
    @PrimaryKeyColumn(name = "message_id", ordinal = 1, type = PrimaryKeyType.CLUSTERED, ordering = Ordering.DESCENDING)
    private UUID messageId;
}
