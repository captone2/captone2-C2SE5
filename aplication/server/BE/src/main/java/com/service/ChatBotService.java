package com.service;

import com.model.entity.ChatBot;

import java.util.List;

public interface ChatBotService {
    void addKeyword(String keyword);
    List<ChatBot> findAllKeyword();
    void removeKeywordById(long id);
    ChatBot findChatBotById(long id);
}
