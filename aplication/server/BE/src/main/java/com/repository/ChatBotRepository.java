package com.repository;

import com.model.entity.ChatBot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//TODO: should refactor name
@Repository
public interface ChatBotRepository extends JpaRepository<ChatBot, Long> {

    // add key
//    @Transactional
//    @Modifying
//    @Query(nativeQuery = true, value = "insert into chatbot (keyword,  ) values (?1, ?2);")
//    void addKeyword(String keyword, long userID);

    // get all key with role super user
    @Query(value = "SELECT * FROM chatbot", nativeQuery = true)
    List<ChatBot> findAllKeyword();


}
