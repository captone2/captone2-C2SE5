package com.repository;

import com.model.entity.MovieImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface MovieImageRepository extends JpaRepository<MovieImage, Long> {


    @Transactional
    @Modifying
    @Query(value = "insert into movie_image (image_url, movie_id) values (?1, ?2) ", nativeQuery = true)
    void addImage(String image_url, long movie_id);


    @Transactional
    @Modifying
    @Query(value = "update movie_image set image_url=?1 where movie_id=?2", nativeQuery = true)
    void updateImage(String image_url, long id);


    @Transactional
    @Modifying
    @Query(value = "DELETE FROM genre_movie WHERE genre_id =:id1 AND movie_id =:id2", nativeQuery = true)
    void deleteGenreMovie(@Param("id1") Integer genreId,@Param("id2") long movieId);


    @Query(value = "select * from movie_image where movie_id = ?1", nativeQuery = true)
    List<MovieImage> listImageMovieById(long id);


    @Query(value = "select genre_id from genre_movie where movie_id = :id", nativeQuery = true)
    List<Integer> getGenreByMovieId(@Param("id") long id);

}
