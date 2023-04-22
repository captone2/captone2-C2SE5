package com.service.impl;

import com.model.entity.MovieImage;
import com.repository.MovieImageRepository;
import com.service.MovieImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieImageServiceImpl implements MovieImageService {
    @Autowired
    MovieImageRepository movieImageRepository;

    // HueHv
    @Override
    public void addImageByIdMovie(String image_url, long movie_id) {
        movieImageRepository.addImage(image_url, movie_id);
    }

    // HueHv
    @Override
    public List<MovieImage> listImageMovieById(long id) {
        return movieImageRepository.listImageMovieById(id);
    }


}
