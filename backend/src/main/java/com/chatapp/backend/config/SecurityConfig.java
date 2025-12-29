package com.chatapp.backend.config;

import com.chatapp.backend.security.JwtAuthFilter;
import com.chatapp.backend.security.UserActivityFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserActivityFilter userActivityFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserActivityFilter userActivityFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userActivityFilter = userActivityFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(userActivityFilter, JwtAuthFilter.class);

        return http.build();
    }
}
