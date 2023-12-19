package com.vinhdd.chatserver.message;

import org.springframework.data.cassandra.repository.CassandraRepository;

public interface ChannelMessageRepository extends CassandraRepository<ChannelMessage, ChannelMessageKey> {

}
