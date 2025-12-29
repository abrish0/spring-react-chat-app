package com.chatapp.backend.service;

import com.chatapp.backend.dto.UserResponse;
import com.chatapp.backend.model.Chat;
import com.chatapp.backend.model.User;
import com.chatapp.backend.repository.ChatRepository;
import com.chatapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    public UserResponse getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToResponse(user);
    }

    /**
     * Get all users that the current user has NOT yet chatted with.
     * This prevents creating duplicate chats with the same user.
     */
    public List<UserResponse> getAllExcept(String username) {
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // All existing chats for the current user
        List<Chat> existingChats = chatRepository.findByUser1OrUser2(currentUser, currentUser);

        // Collect IDs of users that already have a chat with the current user
        var chattedUserIds = existingChats.stream()
                .map(chat -> {
                    User u1 = chat.getUser1();
                    User u2 = chat.getUser2();
                    return currentUser.getId().equals(u1.getId()) ? u2.getId() : u1.getId();
                })
                .collect(Collectors.toSet());

        // From all other users, keep only those that current user has not chatted with
        return userRepository.findByUsernameNot(username)
                .stream()
                .filter(user -> !chattedUserIds.contains(user.getId()))
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
