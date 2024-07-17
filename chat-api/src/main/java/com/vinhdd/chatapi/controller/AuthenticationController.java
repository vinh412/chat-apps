package com.vinhdd.chatapi.controller;

import com.vinhdd.chatapi.payload.response.AuthenticationResponse;
import com.vinhdd.chatapi.service.AuthenticationService;
import com.vinhdd.chatapi.payload.request.LoginRequest;
import com.vinhdd.chatapi.payload.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }

    @GetMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate() {
        return ResponseEntity.ok(service.authenticate());
    }
}
