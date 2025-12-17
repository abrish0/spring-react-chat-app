package com.chatapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageResponse {
    private Long id;
    private String content;
    private String sender;
    private LocalDateTime timestamp;
}
