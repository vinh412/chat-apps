package com.vinhdd.chatserver.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table
public class Message {
    @PrimaryKey
    private Long id;
    private Long messageFrom;
    private Long messageTo;
    private String content;
    private Date createAt;
}
