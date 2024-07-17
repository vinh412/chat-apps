package com.vinhdd.chatapi.repository;

import com.vinhdd.chatapi.model.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
}
