package com.chatapp.backend.service;

import com.chatapp.backend.dto.LoginRequest;
import com.chatapp.backend.dto.SignupRequest;
import com.chatapp.backend.model.User;
import com.chatapp.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.chatapp.backend.security.JwtUtil;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String signup(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username already exists";
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return "Signup successful";
    }

    public String login(LoginRequest request) {
        Optional<User> userOpt = userRepository
                .findAll()
                .stream()
                .filter(u -> u.getUsername().equals(request.getUsername()))
                .findFirst();

        if (userOpt.isEmpty()) {
            return "Invalid username or password";
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid username or password";
        }

        return jwtUtil.generateToken(user.getUsername());
    }
}
