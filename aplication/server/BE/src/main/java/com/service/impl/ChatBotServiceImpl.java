package com.service.impl;

import com.model.entity.ChatBot;
import com.repository.ChatBotRepository;
import com.service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatBotServiceImpl implements ChatBotService{
    @Autowired
    private ChatBotRepository chatBotRepository;

    @Override
    public void addKeyword(String keyword) {
        chatBotRepository.addKeyword(keyword);
    }

    @Override
    public List<ChatBot> findAllKeyword() {
        return chatBotRepository.findAllKeyword();
    }

    @Override
    public void removeKeywordById(long id) {
        chatBotRepository.removeKeywordById(id);
    }

    @Override
    public ChatBot findChatBotById(long id) {
        ChatBot chatBot = chatBotRepository.findChatBotById(id);
        if(chatBot==null){
            return null;
        }
        return chatBot;
    }
}
