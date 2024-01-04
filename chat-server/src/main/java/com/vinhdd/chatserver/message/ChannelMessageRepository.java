package com.vinhdd.chatserver.message;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ChannelMessageRepository extends CassandraRepository<ChannelMessage, ChannelMessageKey> {
    List<ChannelMessage> findAllByKeyChannelIdOrderByKeyMessageIdAsc(UUID channelId);
}
