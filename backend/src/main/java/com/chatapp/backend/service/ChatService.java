package com.chatapp.backend.service;

import com.chatapp.backend.dto.ChatResponse;
import com.chatapp.backend.dto.TypingStatusResponse;
import com.chatapp.backend.model.Chat;
import com.chatapp.backend.model.User;
import com.chatapp.backend.repository.ChatRepository;
import com.chatapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

        private final ChatRepository chatRepository;
        private final UserRepository userRepository;

        public Chat createChat(String username1, String username2) {
                User user1 = userRepository.findByUsername(username1)
                                .orElseThrow(() -> new RuntimeException("User1 not found"));
                User user2 = userRepository.findByUsername(username2)
                                .orElseThrow(() -> new RuntimeException("User2 not found"));

                // Check if chat already exists for this pair (in any order)
                return chatRepository.findByUser1AndUser2(user1, user2)
                                .or(() -> chatRepository.findByUser1AndUser2(user2, user1))
                                .orElseGet(() -> {
                                        Chat chat = Chat.builder()
                                                        .user1(user1)
                                                        .user2(user2)
                                                        .createdAt(LocalDateTime.now())
                                                        .build();
                                        return chatRepository.save(chat);
                                });
        }

        public List<Chat> getUserChats(String username) {
                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                return chatRepository.findByUser1OrUser2(user, user);
        }

        public void setTypingStatus(Long chatId, String username, boolean typing) {
                Chat chat = chatRepository.findById(chatId)
                                .orElseThrow(() -> new RuntimeException("Chat not found"));

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                var now = LocalDateTime.now();
                var until = typing ? now.plusSeconds(3) : null;

                if (chat.getUser1().getId().equals(user.getId())) {
                        chat.setUser1TypingUntil(until);
                } else if (chat.getUser2().getId().equals(user.getId())) {
                        chat.setUser2TypingUntil(until);
                } else {
                        throw new RuntimeException("Not authorized");
                }

                chatRepository.save(chat);
        }

        public TypingStatusResponse getTypingStatus(Long chatId, String username) {
                Chat chat = chatRepository.findById(chatId)
                                .orElseThrow(() -> new RuntimeException("Chat not found"));

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                var now = LocalDateTime.now();
                boolean otherTyping;

                if (chat.getUser1().getId().equals(user.getId())) {
                        otherTyping = chat.getUser2TypingUntil() != null
                                        && chat.getUser2TypingUntil().isAfter(now);
                } else if (chat.getUser2().getId().equals(user.getId())) {
                        otherTyping = chat.getUser1TypingUntil() != null
                                        && chat.getUser1TypingUntil().isAfter(now);
                } else {
                        throw new RuntimeException("Not authorized");
                }

                return new TypingStatusResponse(otherTyping);
        }

        public ChatResponse mapToResponse(Chat chat) {
                return new ChatResponse(
                                chat.getId(),
                                chat.getUser1().getUsername(),
                                chat.getUser2().getUsername(),
                                chat.getCreatedAt());
        }

}
