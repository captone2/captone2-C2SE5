package com.service.impl;

import com.model.entity.Seat;
import com.repository.SeatRepository;
import com.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    @Autowired
    private SeatRepository seatRepository;

    @Override
    public List<Seat> findAllSeatByShowtimeId(long showtimeId) {
        return seatRepository.findAllSeatByShowtimeId(showtimeId);
    }
}
