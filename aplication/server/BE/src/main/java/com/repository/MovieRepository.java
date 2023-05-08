package com.repository;

import com.model.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Transactional
    @Modifying
    @Query(value = "SELECT * FROM movie " +
            " where title like %?1% and production like %?2% and release_date like %?3% and is3D like ?4 ", nativeQuery = true)
    List<Movie> searchMovie(String title, String production,String releaseDate, boolean is3D);

    @Query(value = "select * from movie where id = ?1", nativeQuery = true)
    Movie findMovieById(long id);

    @Query(nativeQuery = true, value = "select * from movie where title like %?1%")
    List<Movie> listAllMovie(String title);

    @Query(nativeQuery = true, value = "select * from movie where title like %?1% limit 1")
    Movie getIdMovieByName(String title);

    @Query(value = "SELECT * FROM movietheater.movie " +
            "where (movie.title like %:keyword%) " +
            "and (:today between showing_from and showing_to)", nativeQuery = true)
    List<Movie> searchMovie(@Param("keyword") String keyword, @Param("today") LocalDate today);


    @Query(value = "SELECT movie.id, movie.cast, movie.content, movie.director, " +
            "movie.is3d, movie.production, movie.rated, movie.release_date, " +
            "movie.running_time, movie.showing_from, movie.showing_to, " +
            "movie.title, movie.trailer_url, movie.account_id " +
            "FROM movietheater.movie " +
            "inner join movie_showtime on movie_showtime.movie_id = movie.id " +
            "inner join showtime on showtime.id = movie_showtime.showtime_id " +
            "inner join screen on screen.showtime_id = showtime.id " +
            "inner join seat on seat.screen_id = screen.id " +
            "inner join booking_seat on booking_seat.seat_id = seat.id " +
            "group by movie.id " +
            "order by count(movie.id)desc " +
            "limit 5", nativeQuery = true)
    List<Movie> listTopFiveMovie();

    @Query(value = "SELECT distinct movie.*" +
            "FROM movietheater.movie \n" +
            "inner join movie_showtime on movie_showtime.movie_id = movie.id \n" +
            "inner join showtime on showtime.id = movie_showtime.showtime_id \n" +
            "inner join screen on screen.showtime_id = showtime.id \n" +
            "inner join seat on seat.screen_id = screen.id \n" +
            "inner join booking_seat on booking_seat.seat_id = seat.id\n" +
            "inner join booking on booking.id = booking_seat.booking_id\n" +
            "inner join account on account.id = booking.account_id\n" +
            "where account.id = :accountId", nativeQuery = true)
    List<Movie> findAllMovieSeenByAccount(@Param("accountId") long accountId);

    @Query(value = "SELECT movie.* FROM movie " +
            "INNER JOIN movie_show_time ON  movie_show_time.movie_id = movie.id\n" +
            "INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "WHERE TIME(now()) >= TIME(showtime.show_time)+2; ", nativeQuery = true)
    List<Movie> findAllMovieShowing();

    @Query(value = "SELECT DISTINCT movie.* FROM movie " +
            "INNER JOIN movie_show_time ON  movie_show_time.movie_id = movie.id\n" +
            "INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "WHERE Date(now()) <= Date(showtime.show_time);", nativeQuery = true)
    List<Movie> findAllMovieComingSoon();

    @Query(value = "SELECT movie.* FROM movie \n" +
            "INNER JOIN movie_show_time ON movie_show_time.movie_id = movie.id \n" +
            "INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "INNER JOIN seat ON seat.screen_id = movie_show_time.screen_id\n" +
            "INNER JOIN booking_seat ON booking_seat.seat_id = seat.id\n" +
            "GROUP BY movie.id \n" +
            "ORDER BY count(movie.id) DESC \n" +
            "LIMIT 1;", nativeQuery = true)
    Movie findOneMovieBestSeller();

}

