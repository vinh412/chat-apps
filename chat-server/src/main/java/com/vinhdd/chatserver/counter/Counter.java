package com.vinhdd.chatserver.counter;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table("counter")
public class Counter {
    @Id
    @PrimaryKey
    private Long id; // channelId
    private Long value;
}
