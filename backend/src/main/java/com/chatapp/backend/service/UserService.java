package com.chatapp.backend.service;

import com.chatapp.backend.dto.UserResponse;
import com.chatapp.backend.model.User;
import com.chatapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToResponse(user);
    }

    public List<UserResponse> getAllExcept(String username) {
        return userRepository.findByUsernameNot(username)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt());
    }
}
