package com.service;

import com.model.dto.ShowTimeDTO;
import com.model.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.model.entity.Showtime;
import java.time.LocalTime;
import java.util.List;

public interface ShowtimeService {


    Showtime findShowTimeById(long id);

}
