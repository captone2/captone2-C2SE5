package com.service;

import com.model.entity.Seat;
import java.util.List;

public interface SeatService {
    List<Seat> findAllSeatByShowtimeId(long showtimeId);
}
