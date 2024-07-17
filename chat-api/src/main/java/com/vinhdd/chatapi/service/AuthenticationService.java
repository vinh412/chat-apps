package com.vinhdd.chatapi.service;

import com.vinhdd.chatapi.exception.BadRequestException;
import com.vinhdd.chatapi.payload.response.ApiResponse;
import com.vinhdd.chatapi.payload.response.AuthenticationResponse;
import com.vinhdd.chatapi.payload.request.LoginRequest;
import com.vinhdd.chatapi.payload.request.RegisterRequest;
import com.vinhdd.chatapi.config.JwtService;
import com.vinhdd.chatapi.model.user.Role;
import com.vinhdd.chatapi.model.user.User;
import com.vinhdd.chatapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthenticationResponse register(RegisterRequest request) {
        if(repository.existsByEmail(request.getEmail())){
            ApiResponse apiResponse = new ApiResponse(Boolean.FALSE, "email already exists");
            throw new BadRequestException(apiResponse);
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user, 1000 * 3 * 60);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        int timeToLive = 1000 * 3 * 60;
        if(request.isRememberMe()){
            timeToLive = 1000 * 24 * 60 * 60;
        }
        var jwtToken = jwtService.generateToken(user, timeToLive);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String jwt = jwtService.generateToken(user, 1000 * 2 * 60);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .role(user.getRole())
                .token(jwt)
                .build();
    }
}
