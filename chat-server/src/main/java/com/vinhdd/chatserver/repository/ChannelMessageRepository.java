package com.vinhdd.chatserver.repository;

import com.vinhdd.chatserver.model.ChannelMessageKey;
import com.vinhdd.chatserver.model.ChannelMessage;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface ChannelMessageRepository extends CassandraRepository<ChannelMessage, ChannelMessageKey> {
    List<ChannelMessage> findAllByKeyChannelIdOrderByKeyMessageIdAsc(UUID channelId);
}
