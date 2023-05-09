package com.repository;

import com.model.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {



    Page<Movie> findAll(Pageable pageable);

    @Query(value = "SELECT * FROM movie WHERE id = ?1", nativeQuery = true)
    Movie findMovieById(Long id);

    @Query(value = "SELECT * FROM movie WHERE LOWER(title) LIKE :title", nativeQuery = true)
    List<Movie> searchMovieByTitle(@Param("title") String keyword);


    @Query(value = "SELECT DISTINCT movie.* FROM movie " +
            "INNER JOIN movie_show_time ON  movie_show_time.movie_id = movie.id\n" +
            "INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "WHERE TIME(now()) >= TIME(showtime.show_time)+2 AND movie_show_time.show_date = DATE_FORMAT(NOW(), '%Y-%m-%d'); ", nativeQuery = true)
    List<Movie> findAllMovieShowing();

    @Query(value = "SELECT DISTINCT movie.* FROM movie \n" +
            "            INNER JOIN movie_show_time ON  movie_show_time.movie_id = movie.id\n" +
            "            INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "            WHERE TIME(now()) <= TIME(showtime.show_time) AND movie_show_time.show_date >= DATE_FORMAT(NOW(), '%Y-%m-%d');", nativeQuery = true)
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

