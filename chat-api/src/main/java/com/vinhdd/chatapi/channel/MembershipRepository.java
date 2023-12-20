package com.vinhdd.chatapi.channel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, MembershipKey> {
    Optional<List<Membership>> findAllByChannelId(Long channelId);
    Optional<List<Membership>> findAllByUserId(Long userId);
}
