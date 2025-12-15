package com.chatapp.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // disable CSRF for testing
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll() // allow all auth endpoints
                .anyRequest().authenticated(); // everything else requires auth (can change later)

        return http.build();
    }
}
