package com.vinhdd.chatapi.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    @Override
    public Optional<User> getUser(UUID userId) {
        return userRepository.findById(userId);
    }
    @Override
    public List<User> findUsersByEmail(String email) {
        return userRepository.findAllByContainEmail(email);
    }
}
