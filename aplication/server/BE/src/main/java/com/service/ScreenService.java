package com.service;

import com.model.entity.Screen;

import java.util.List;

import java.util.Optional;

public interface ScreenService {
    List<Screen> findAll();

    Optional<Screen> findScreenById(String id);

    List<Screen> findScreenByName(String keyWord);

}
