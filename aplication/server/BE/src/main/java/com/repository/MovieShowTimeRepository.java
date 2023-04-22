package com.repository;


import com.model.entity.MovieShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MovieShowTimeRepository extends JpaRepository<MovieShowTime,Long> {
    @Query(value = "select * from movie_show_time where movie_id = :movieId and show_date >= DATE_FORMAT(NOW(), '%Y-%m-%d')", nativeQuery = true)
    List<MovieShowTime> findAllMovieShowTimeByMovieId(@Param("movieId") long movieId);

    @Query(value = "select * from movie_show_time where id = :id", nativeQuery = true)
    MovieShowTime findMovieShowTimeById(@Param("id") long id);

    @Query(value = "select * from movie_show_time where show_date like :date", nativeQuery = true)
    List<MovieShowTime> findMovieShowTimeByDate(@Param("date") String date);


    @Query(value = "select * from movie_show_time where year(show_date) = year(now())", nativeQuery = true)
    List<MovieShowTime> findMovieShowTimeByYearNow();
}
