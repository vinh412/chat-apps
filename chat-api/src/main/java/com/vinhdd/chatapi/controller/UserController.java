package com.vinhdd.chatapi.controller;

import com.vinhdd.chatapi.model.user.User;
import com.vinhdd.chatapi.payload.response.UserResponse;
import com.vinhdd.chatapi.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    final private UserServiceImpl userService;

    @GetMapping("/{userId}")
    public Optional<User> getUser(@PathVariable UUID userId) {
        return userService.getUser(userId);
    }

    @GetMapping("")
    public ResponseEntity<List<UserResponse>> findUsersByEmail(@RequestParam("q") String email) {
        return ResponseEntity.ok(userService.findUsersByEmail(email).stream().map(
                user -> UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .username(user.getUsername())
                        .firstname(user.getFirstname())
                        .lastname(user.getLastname())
                        .role(user.getRole())
                        .build()
        ).collect(Collectors.toList()));
    }
}
