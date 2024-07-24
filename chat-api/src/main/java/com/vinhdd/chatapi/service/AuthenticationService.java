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
    private final int JWT_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day
    private final int JWT_EXPIRATION_TIME_REMEMBER_ME = 1000 * 60 * 60 * 24 * 3; // 3 day
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
        var jwtToken = jwtService.generateToken(user, JWT_EXPIRATION_TIME);
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
        int timeToLive = JWT_EXPIRATION_TIME;
        if(request.isRememberMe()){
            timeToLive = JWT_EXPIRATION_TIME_REMEMBER_ME;
        }
        var jwtToken = jwtService.generateToken(user, timeToLive);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String jwt = jwtService.generateToken(user, JWT_EXPIRATION_TIME);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .role(user.getRole())
                .token(jwt)
                .build();
    }
}
