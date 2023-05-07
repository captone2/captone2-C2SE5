package com.repository;

import com.model.entity.ChatBot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChatBotRepository extends JpaRepository<ChatBot, Long> {

    // add key
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "insert into chat_bot (keyword) values (?1);")
    void addKeyword(String keyword);

    // get all key with role super user
    @Query(value = "SELECT * FROM chat_bot", nativeQuery = true)
    List<ChatBot> findAllKeyword();

    // remove key
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM chat_bot WHERE id = ?1",nativeQuery = true)
    void removeKeywordById(long id);

    @Query(value = "SELECT * FROM chat_bot WHERE id = ?1",nativeQuery = true)
    ChatBot findChatBotById(long id);

}
