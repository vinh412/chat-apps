package com.vinhdd.chatserver.counter;

import org.springframework.data.cassandra.repository.CassandraRepository;

public interface CounterRepository extends CassandraRepository<Counter, Long> {
}
