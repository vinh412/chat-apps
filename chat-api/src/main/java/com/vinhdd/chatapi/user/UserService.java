package com.vinhdd.chatapi.user;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<User> getUser(UUID userId);
    List<User> findUsersByEmail(String email);
}
