package com.repository;

import ch.qos.logback.core.boolex.EvaluationException;
import com.model.dto.GenreDTO;
import com.model.dto.TopRateDTO;
import com.model.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Tuple;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {



    Page<Movie> findAll(Pageable pageable);

    @Query(value = "SELECT * FROM movie where is_enabled = 1;", nativeQuery = true)
    List<Movie> findAllMovie();

    @Query(value = "SELECT * FROM movie WHERE id = ?1", nativeQuery = true)
    Movie findMovieById(Long id);

    @Query(value = "SELECT * FROM movie WHERE LOWER(title) LIKE %:title% and is_enabled = 1 order by create_at DESC", nativeQuery = true)
    List<Movie> searchMovieByTitle(@Param("title") String keyword);


    @Transactional
    @Modifying
    @Query(value = "UPDATE movie\n" +
            "    SET is_enabled = 0\n" +
            "    WHERE id = :id", nativeQuery = true)
    void deleteMovie(@Param("id") Long id);

    @Query(value = "SELECT DISTINCT movie.* FROM movie " +
            "INNER JOIN movie_show_time ON  movie_show_time.movie_id = movie.id\n" +
            "INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "WHERE movie.is_enabled=true AND TIME(now()) >= TIME(showtime.show_time)+2 AND movie_show_time.show_date = DATE_FORMAT(NOW(), '%Y-%m-%d'); ", nativeQuery = true)
    List<Movie> findAllMovieShowing();

    @Query(value = "SELECT DISTINCT movie.* FROM movie \n" +
            "            INNER JOIN movie_show_time ON  movie_show_time.movie_id = movie.id\n" +
            "            INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "            WHERE movie.is_enabled=true AND movie_show_time.show_date >= DATE_FORMAT(NOW(), '%Y-%m-%d');", nativeQuery = true)
    List<Movie> findAllMovieComingSoon();

    @Query(value = "SELECT movie.* FROM movie \n" +
            "INNER JOIN movie_show_time ON movie_show_time.movie_id = movie.id \n" +
            "INNER JOIN showtime ON showtime.id = movie_show_time.showtime_id\n" +
            "INNER JOIN seat ON seat.screen_id = movie_show_time.screen_id\n" +
            "INNER JOIN booking_seat ON booking_seat.seat_id = seat.id\n" +
            "WHERE movie.is_enabled=true\n" +
            "GROUP BY movie.id \n" +
            "ORDER BY count(movie.id) DESC \n" +
            "LIMIT 1;", nativeQuery = true)
    Movie findOneMovieBestSeller();

    @Query(value = "SELECT movie.* FROM movie \n" +
            "JOIN movie_show_time ON movie.id = movie_show_time.movie_id\n" +
            "JOIN booking ON booking.movie_showtime_id = movie_show_time.id\n" +
            "WHERE movie.is_enabled=true AND MONTH(movie_show_time.show_date) = MONTH(NOW())\n" +
            "GROUP BY movie_show_time.movie_id\n" +
            "ORDER BY sum(booking.total_price) DESC\n" +
            "LIMIT 5\n", nativeQuery = true)
    List<Movie> findTop5MovieHighestRevenueOfMonth();

    @Query(value = " SELECT ROUND(AVG(rate), 1) as RATE  FROM comment\n" +
            "    WHERE movie_id = :id", nativeQuery = true)
    Integer getRateByMovieId(@Param("id") Long id);



    @Query(value = "SELECT movie.title as title ,count(comment.movie_id) as vote , ROUND(avg(rate),1) as rate FROM comment \n" +
            "JOIN movie ON movie.id = comment.movie_id\n" +
            "WHERE YEAR(comment.create_at) = YEAR(CURRENT_DATE())\n" +
            "AND MONTH(comment.create_at) BETWEEN MONTH(NOW())-2 AND MONTH(NOW())\n" +
            "GROUP BY comment.movie_id\n" +
            "ORDER BY ROUND(avg(rate),1) DESC", nativeQuery = true)
    List<Tuple> getTopRate();

    default List<TopRateDTO> getMovieRate() {
        List<Tuple> resultList = getTopRate();
        List<TopRateDTO> movieRateList = new ArrayList<>();

        for (Tuple tuple : resultList) {
            String title = (String) tuple.get("title");
            long vote = ((Number) tuple.get("vote")).longValue();
            BigDecimal rateBigDecimal = (BigDecimal) tuple.get("rate");
            double rate = rateBigDecimal.doubleValue();

            TopRateDTO movieRate = new TopRateDTO(title, vote, rate);
            movieRateList.add(movieRate);
        }

        return movieRateList;
    }


    @Query(value = "SELECT genre.name as name , count(genre.name) as total  FROM booking\n" +
            "JOIN movie_show_time ON movie_show_time.id = booking.movie_showtime_id\n" +
            "JOIN movie ON movie.id = movie_show_time.movie_id\n" +
            "JOIN genre_movie ON genre_movie.movie_id = movie.id\n" +
            "JOIN genre ON genre.id = genre_movie.genre_id\n" +
            "GROUP BY genre.name", nativeQuery = true)
    List<Tuple> getGenre();

    default List<GenreDTO> getGenreMovie() {
        List<Tuple> resultList = getGenre();
        List<GenreDTO> movieRateList = new ArrayList<>();

        for (Tuple tuple : resultList) {
            String name = (String) tuple.get("name");
            long total = ((Number) tuple.get("total")).longValue();

            GenreDTO genre = new GenreDTO(name,total);
            movieRateList.add(genre);
        }
        return movieRateList;
    }

}

