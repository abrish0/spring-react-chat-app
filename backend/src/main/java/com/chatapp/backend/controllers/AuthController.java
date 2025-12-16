package com.chatapp.backend.controllers;

import com.chatapp.backend.dto.LoginRequest;
import com.chatapp.backend.dto.SignupRequest;
import com.chatapp.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(
                "{\"message\":\"" + authService.signup(request) + "\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        return ResponseEntity.ok(
                "{\"token\":\"" + token + "\"}");
    }

}
