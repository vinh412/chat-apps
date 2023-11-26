package com.vinhdd.chatapi.user;

import java.util.Optional;

public interface UserService {
    Optional<User> getUser(Long userId);
}
