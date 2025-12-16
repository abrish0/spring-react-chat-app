package com.chatapp.backend.controllers;

import com.chatapp.backend.dto.ChatResponse;
import com.chatapp.backend.model.Chat;
import com.chatapp.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ChatResponse createChat(Authentication auth, @RequestParam String withUser) {
        Chat chat = chatService.createChat(auth.getName(), withUser);
        return chatService.mapToResponse(chat);
    }

    @GetMapping
    public List<ChatResponse> getChats(Authentication auth) {
        return chatService.getUserChats(auth.getName())
                .stream()
                .map(chatService::mapToResponse)
                .collect(Collectors.toList());
    }

}
