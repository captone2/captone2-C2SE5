package com.repository;


import com.model.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    @Query(value = "SELECT * FROM movietheater.genre", nativeQuery = true)
    List<Genre> findAllGenre();

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "insert into genre_movie (genre_id, movie_id) values (?1, ?2);")
    void addGenreToMovie(long genre_id, long movie_id);


    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update genre_movie set genre_id=?1 where movie_id=?2")
    void updateGenreToMovie(long genre_id, long movie_id);
}
