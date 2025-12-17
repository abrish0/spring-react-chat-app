package com.chatapp.backend.controllers;

import com.chatapp.backend.dto.MessageResponse;
import com.chatapp.backend.dto.SendMessageRequest;
import com.chatapp.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public MessageResponse sendMessage(
            Authentication auth,
            @RequestBody SendMessageRequest request) {
        return messageService.sendMessage(auth.getName(), request);
    }

    @GetMapping("/{chatId}")
    public List<MessageResponse> getMessages(
            Authentication auth,
            @PathVariable Long chatId) {
        return messageService.getMessages(chatId, auth.getName());
    }
}
