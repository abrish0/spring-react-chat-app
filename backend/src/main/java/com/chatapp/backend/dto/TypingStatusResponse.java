package com.chatapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TypingStatusResponse {
    private boolean otherUserTyping;
}


