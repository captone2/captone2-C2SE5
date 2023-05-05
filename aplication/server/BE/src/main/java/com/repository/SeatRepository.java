package com.repository;

import com.model.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    @Query(value = "select seat.id, seat.name, seat.vip, seat.screen_id from seat \n" +
            "join movie_show_time on movie_show_time.screen_id = seat.screen_id\n" +
            "where movie_show_time.id = :showtimeId", nativeQuery = true)
    List<Seat> findAllSeatByShowtimeId(@Param("showtimeId") long showtimeId);


}
