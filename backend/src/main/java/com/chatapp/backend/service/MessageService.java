package com.chatapp.backend.service;

import com.chatapp.backend.dto.MessageResponse;
import com.chatapp.backend.dto.SendMessageRequest;
import com.chatapp.backend.model.Chat;
import com.chatapp.backend.model.Message;
import com.chatapp.backend.model.User;
import com.chatapp.backend.repository.ChatRepository;
import com.chatapp.backend.repository.MessageRepository;
import com.chatapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public MessageResponse sendMessage(String username, SendMessageRequest request) {
        User sender = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Chat chat = chatRepository.findById(request.getChatId())
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        // Ensure sender is part of the chat
        if (!chat.getUser1().equals(sender) && !chat.getUser2().equals(sender)) {
            throw new RuntimeException("Not authorized");
        }

        Message message = Message.builder()
                .content(request.getContent())
                .sender(sender)
                .chat(chat)
                .timestamp(LocalDateTime.now())
                .build();

        messageRepository.save(message);

        return new MessageResponse(
                message.getId(),
                message.getContent(),
                sender.getUsername(),
                message.getTimestamp());
    }

    public List<MessageResponse> getMessages(Long chatId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        if (!chat.getUser1().equals(user) && !chat.getUser2().equals(user)) {
            throw new RuntimeException("Not authorized");
        }

        return messageRepository.findByChatOrderByTimestampAsc(chat)
                .stream()
                .map(m -> new MessageResponse(
                        m.getId(),
                        m.getContent(),
                        m.getSender().getUsername(),
                        m.getTimestamp()))
                .toList();
    }
}
