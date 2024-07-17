package com.vinhdd.chatapi.repository;

import com.vinhdd.chatapi.model.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChannelRepository extends JpaRepository<Channel, UUID> {
}
