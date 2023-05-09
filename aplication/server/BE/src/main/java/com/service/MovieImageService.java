package com.service;

import com.model.entity.MovieImage;


import java.util.List;

public interface MovieImageService {

    void addImageByIdMovie(String image_url, long id);

    List<MovieImage> listImageMovieById(long movie_id);
}
