package com.chatapp.backend.repository;

import com.chatapp.backend.model.Message;
import com.chatapp.backend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByChatOrderByTimestampAsc(Chat chat);
}
