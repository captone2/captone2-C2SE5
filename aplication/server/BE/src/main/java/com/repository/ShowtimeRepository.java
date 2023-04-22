package com.repository;


import com.model.dto.ShowTimeDTO;

import com.model.entity.Movie;
import com.model.entity.Showtime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
//    //HueHV
//    @Query(value = "select * from showtime", nativeQuery = true)
//    List<Showtime> listShowTime();
//
//    //HueHV
//    @Transactional
//    @Modifying
//    @Query(value = "insert into movie_showtime (movie_id, showtime_id) values (?1, ?2);", nativeQuery = true)
//    void joinTableMovieAndShowtime(long movie_id, long showtime_id);
//
//    //HueHV
//    @Query(value = "select * " +
//            "from showtime " +
//            "where show_time = ?1 and price_id =?2 limit 1 ", nativeQuery = true)
//    Showtime getIdByShowDayAndShowTime(LocalTime show_time, long price_id);
//
//    //HueHV
//    @Transactional
//    @Modifying
//    @Query(value = "insert into showtime(show_time, price_id) values(?1, ?2)", nativeQuery = true)
//    void addShowTime(LocalTime showTime, long price_id);
//
//    //HueHV
//    @Transactional
//    @Modifying
//    @Query(value = "update showtime set show_time=?1, price_id=?2 where id=?3", nativeQuery = true)
//    void updateShowTime(LocalTime showTime, long price_id, long id);
//
//    //    TuHC - lay showtime bang movieid
//    @Query(value = "SELECT showtime.id, showtime.show_time, showtime.price_id " +
//            "FROM movietheater.showtime " +
//            "INNER JOIN movie_showtime ON movie_showtime.showtime_id = showtime.id " +
//            "INNER JOIN movie ON movie.id = movie_showtime.movie_id " +
//            "WHERE movie.id = :id", nativeQuery = true)
//    List<Showtime> findShowtimeByMovieId(@Param("id") long id);
//
//    @Query(value = "select showtime.id as id, movie.title as title, screen.name as screenName, showtime.show_day as showDay," +
//            " showtime.show_time as showTime, movie.is3D as is3d, price.price as price from `showtime` \n" +
//            "join movie_showtime on movie_showtime.showtime_id = showtime.id\n" +
//            "join movie on movie_showtime.movie_id = movie.id\n" +
//            "join screen on showtime.id = screen.showtime_id\n" +
//            "join price on showtime.price_id = price.id\n" +
//            "order by showtime.show_day desc, showtime.show_time desc", nativeQuery = true)
//    Page<ShowTimeDTO>getAllShowTime(Pageable pageable);
//
//    @Query(value = "select showtime.id as id, movie.title as title, screen.name as screenName, showtime.show_day as showDay, " +
//            "showtime.show_time as showTime, movie.is3D as is3d, price.price as price from `showtime` " +
//            "join movie_showtime on movie_showtime.showtime_id = showtime.id\n" +
//            "join movie on movie_showtime.movie_id = movie.id\n" +
//            "join screen on showtime.id = screen.showtime_id\n" +
//            "join price on showtime.price_id = price.id\n" +
//            "where movie.title like %:name%", nativeQuery = true)
//    Page<ShowTimeDTO> searchByName(@Param("name") String name, Pageable pageable);

    @Query(value = "select * from showtime where id = ?1", nativeQuery = true)
    Showtime findShowTimeById(long id);

}
