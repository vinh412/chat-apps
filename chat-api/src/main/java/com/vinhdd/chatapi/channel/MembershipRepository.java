package com.vinhdd.chatapi.channel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MembershipRepository extends JpaRepository<Membership, MembershipKey> {
    @Query(value = "SELECT * FROM membership WHERE channel_id = ?1 AND status = 'ACCEPTED' ", nativeQuery = true)
    Optional<List<Membership>> findAllMembersByChannelId(Long channelId);
    @Query(value = "SELECT * FROM membership WHERE channel_id = ?1 AND status = 'PENDING' ", nativeQuery = true)
    Optional<List<Membership>> findAllRequestsByChannelId(Long channelId);
    Optional<List<Membership>> findAllByUserId(Long userId);
}
