package com.chatapp.backend.controllers;

import com.chatapp.backend.dto.UserResponse;
import com.chatapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse getMe(Authentication authentication) {
        String username = authentication.getName();
        return userService.getCurrentUser(username);
    }

    @GetMapping
    public List<UserResponse> getAllUsers(Authentication authentication) {
        String username = authentication.getName();
        return userService.getAllExcept(username);
    }
}
