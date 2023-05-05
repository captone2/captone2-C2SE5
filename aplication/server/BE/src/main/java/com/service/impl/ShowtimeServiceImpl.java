package com.service.impl;

import com.model.entity.Movie;
import com.model.entity.Showtime;
import com.repository.ShowtimeRepository;
import com.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import com.model.dto.ShowTimeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.util.List;


@Service
public class ShowtimeServiceImpl implements ShowtimeService {
    @Autowired
    ShowtimeRepository showtimeRepository;

    @Override
    public Showtime findShowTimeById(long id) {
        return showtimeRepository.findShowTimeById(id);
    }

}
