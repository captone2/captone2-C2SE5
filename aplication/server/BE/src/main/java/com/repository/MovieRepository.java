package com.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @Query(value = "SELECT * FROM movietheater.movie " +
            "where now() >= showing_from and now() <= showing_to", nativeQuery = true)
    List<Movie> findAllMovieShowing();


    @Query(value = "SELECT * FROM movietheater.movie " +
            "where :today < showing_from", nativeQuery = true)
    List<Movie> findAllMovieComingSoon(@Param("today") LocalDate today);


    @Query(value = "SELECT * FROM movie", nativeQuery = true)
    Page<Movie> findAllMovie(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "SELECT * FROM movie " +
            " where title like %?1% and production like %?2% and release_date like %?3% and is3D like ?4 ", nativeQuery = true)
    List<Movie> searchMovie(String title, String production,String releaseDate, boolean is3D);


    @Query(value = "select * from movie where id = ?1", nativeQuery = true)
    Movie findMovieById(long id);


    @Query(nativeQuery = true, value = "select * from movie where title like %?1%")
    Page<Movie> listAllMovie(String title, Pageable pageable);


    @Query(nativeQuery = true, value = "select * from movie where title like %?1%")
    List<Movie> listAllMovie(String title);


    @Query(nativeQuery = true, value = "select * from movie where title like %?1% limit 1")
    Movie getIdMovieByName(String title);


    @Transactional
    @Modifying
    @Query(value = "insert into movie(title, showing_From, showing_To, cast, director, release_Date, rated, running_Time,production, trailer_Url, content, is3D, account_Id) " +
            " values(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13)", nativeQuery = true)
    void createMovie(String title, LocalDate showing_From, LocalDate showing_To, String cast, String director, LocalDate release_Date, String rated, int running_Time,
                     String production,String trailer_Url, String content, boolean is3D, long account_Id);




    //HueHV
    @Transactional
    @Modifying
    @Query(value = "update movie set title = ?1, showing_From = ?2, showing_To = ?3, cast = ?4, director = ?5, release_Date = ?6, rated = ?7, running_Time = ?8,  " +
            "production = ?9, trailer_Url = ?10, content = ?11, is3D = ?12, account_Id = ?13 where movie.id = ?14 ", nativeQuery = true)
    void updateMovie(String title, LocalDate showing_From, LocalDate showing_To, String cast, String director, LocalDate release_Date, String rated, int running_Time,
                     String production,String trailer_Url, String content, boolean is3D, long account_Id, long id);


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


    @Query(value = "SELECT * FROM movietheater.movie \n" +
            "where ((curdate() > showing_from) and (curdate() < showing_to))\n" +
            "or curdate() < showing_from", nativeQuery = true)
    List<Movie> findAllMovieShowingAndComingSoon();


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
}

