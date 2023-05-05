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


    @Query(value = "select * from showtime where id = ?1", nativeQuery = true)
    Showtime findShowTimeById(long id);

}
