package com.repository;


import com.model.entity.MovieShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface MovieShowTimeRepository extends JpaRepository<MovieShowTime,Long> {
    @Query(value = "select * from movie_show_time where movie_id = :movieId and show_date >= DATE_FORMAT(NOW(), '%Y-%m-%d')", nativeQuery = true)
    List<MovieShowTime> findAllMovieShowTimeByMovieId(@Param("movieId") long movieId);

    @Query(value = "select * from movie_show_time where id = :id", nativeQuery = true)
    MovieShowTime findMovieShowTimeById(@Param("id") long id);

    @Query(value = "select * from movie_show_time where show_date like :date", nativeQuery = true)
    List<MovieShowTime> findMovieShowTimeByDate(@Param("date") String date);


    @Query(value = "select * from movie_show_time where year(show_date) = year(now()) ORDER BY show_date", nativeQuery = true)
    List<MovieShowTime> findMovieShowTimeByYearNow();


    @Query(value = "select * from movie_show_time \n" +
            "join genre_movie on genre_movie.movie_id = movie_show_time.movie_id\n" +
            " where year(show_date) = year(now()) and genre_id = :id\n" +
            " ORDER BY show_date ", nativeQuery = true)
    List<MovieShowTime> findMovieShowTimeByYearAndGenre(@Param("id") String id);


    @Query(value = "select * from movie_show_time where show_date = CURDATE()\n" +
            "group by movie_id", nativeQuery = true)
    List<MovieShowTime> findMovieCNowPlaying();

    @Query(value = "select * from movie_show_time \n" +
            "join genre_movie on genre_movie.movie_id = movie_show_time.movie_id\n" +
            "where show_date = CURDATE() and genre_id = 1\n" +
            "group by movie_show_time.movie_id", nativeQuery = true)
    List<MovieShowTime> findMovieShowTimeNow(@Param("id") String id);


    @Transactional
    @Modifying
    @Query(value = " INSERT INTO movie_show_time(show_date,movie_id,screen_id,showtime_id) VALUES (:date,:movie,:screen,:showtime)", nativeQuery = true)
    void addMovieShowtime(@Param("date") String date,@Param("movie") Integer movie,@Param("screen") Integer screen,@Param("showtime") Integer showtime);

    @Query(value = "SELECT * FROM movie_show_time WHERE   movie_id = :movieId AND show_date = :showDate AND screen_id = :screenId", nativeQuery = true)
    List<MovieShowTime> findMovieShowTimeByShowDateAndScreen(@Param("movieId") Integer movieId,@Param("showDate") String showDate,@Param("screenId") Integer screenId);
}
