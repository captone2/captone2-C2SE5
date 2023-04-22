package com.service;

import com.model.entity.Genre;


import java.util.List;

public interface GenreService {
    List<Genre> findAllGenre();
    void addGenreToMovie(long genre_id, long movie_id);
    void updateGenreToMovie(long genre_id, long movie_id);

    List<Genre> findAll();
}
