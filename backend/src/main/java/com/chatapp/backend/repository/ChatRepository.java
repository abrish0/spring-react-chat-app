package com.chatapp.backend.repository;

import com.chatapp.backend.model.Chat;
import com.chatapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    // Find chat between two users
    Optional<Chat> findByUser1AndUser2(User user1, User user2);

    // Find all chats of a user
    List<Chat> findByUser1OrUser2(User user1, User user2);
}
