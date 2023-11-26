package com.vinhdd.chatapi.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Override
    public Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }
}
