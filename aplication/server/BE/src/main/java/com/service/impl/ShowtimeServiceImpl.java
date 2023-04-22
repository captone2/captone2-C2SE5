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
//
//    //HueHV
//    @Override
//    public List<Showtime> listShowTimes() {
//        return showtimeRepository.listShowTime();
//    }
//
//    @Override
//    public Showtime getIdByShowDayAndShowTime(LocalTime show_time, long price_id) {
//        return showtimeRepository.getIdByShowDayAndShowTime(show_time, price_id);
//    }
//
//    //HueHV
//    @Override
//    public void joinTableMovieAndShowtime(long movie_id, long showtime_id) {
//        showtimeRepository.joinTableMovieAndShowtime(movie_id, showtime_id);
//    }
//
//    //HueHV
//    @Override
//    public void addShowTimes(LocalTime showTime, long price_id) {
//        showtimeRepository.addShowTime(showTime, price_id);
//    }
//
//    @Override
//    public void updateShowTimes(LocalTime showTime, long price_id, long id) {
//        showtimeRepository.updateShowTime(showTime, price_id, id);
//    }
////    TuHC - lay gio chieu theo phim
//    @Override
//    public List<Showtime> findShowtimeByMovieId(long id) {
//        return showtimeRepository.findShowtimeByMovieId(id);
//    }
//    @Override
//    public Page<ShowTimeDTO> getAllShowTime(Pageable pageable) {
//        return showtimeRepository.getAllShowTime(pageable);
//    }
//
//    @Override
//    public Page<ShowTimeDTO> searchByName(String name, Pageable pageable) {
//        return showtimeRepository.searchByName(name, pageable);
//    }
    @Override
    public Showtime findShowTimeById(long id) {
        return showtimeRepository.findShowTimeById(id);
    }

}
