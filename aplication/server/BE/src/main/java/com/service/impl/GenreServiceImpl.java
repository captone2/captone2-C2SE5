package com.service.impl;

import com.model.entity.Genre;
import com.repository.GenreRepository;
import com.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService {
    @Autowired
    private GenreRepository genreRepository;
    @Override
    public List<Genre> findAllGenre() {
        return genreRepository.findAllGenre();
    }
    @Override
    public void addGenreToMovie(long genre_id, long movie_id) {
        genreRepository.addGenreToMovie(genre_id, movie_id);
    }

    @Override
    public void updateGenreToMovie(long genre_id, long movie_id) {
        genreRepository.updateGenreToMovie(genre_id, movie_id);
    }

    @Override
    public List<Genre> findAll() {
        return genreRepository.findAll();
    }
}
