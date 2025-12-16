package com.chatapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ChatResponse {
    private Long id;
    private String user1;
    private String user2;
    private LocalDateTime createdAt;
}
