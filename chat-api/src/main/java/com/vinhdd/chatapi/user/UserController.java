package com.vinhdd.chatapi.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    final private UserServiceImpl userService;
    @GetMapping("/{userId}")
    public Optional<User> getUser(@PathVariable UUID userId){
        return userService.getUser(userId);
    }

    @GetMapping("/q={email}")
    public ResponseEntity<List<User>> findUsersByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.findUsersByEmail(email));
    }
}
