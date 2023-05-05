package com.service.impl;

import com.model.entity.Screen;
import com.repository.ScreenRepository;
import com.service.ScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ScreenServiceImpl implements ScreenService {
    @Autowired
    ScreenRepository screenRepository;

    @Override
    public List<Screen> findAll() {
        return screenRepository.findAll();
    }

    @Override
    public Optional<Screen> findScreenById(String id) {
        return screenRepository.findById(Long.parseLong(id));
    }

    @Override
    public List<Screen> findScreenByName(String keyWord) {
        return screenRepository.findAllByName(keyWord);
    }

}
