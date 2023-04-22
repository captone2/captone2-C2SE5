package com.repository;

import com.model.entity.MovieImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface MovieImageRepository extends JpaRepository<MovieImage, Long> {

    // HueHv
    @Transactional
    @Modifying
    @Query(value = "insert into movie_image (image_url, movie_id) values (?1, ?2) ", nativeQuery = true)
    void addImage(String image_url, long movie_id);

    // HueHv
    @Transactional
    @Modifying
    @Query(value = "update movie_image set image_url=?1, movie_id=?2 where id=?3", nativeQuery = true)
    void updateImage(String image_url, long movie_id, long id);

    // HueHV
    @Query(value = "select * from movie_image where movie_id = ?1", nativeQuery = true)
    List<MovieImage> listImageMovieById(long id);

}
