package com.repository;

import com.model.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {

    @Query(value = "select * from showtime where id = ?1", nativeQuery = true)
    Showtime findShowTimeById(long id);



}
