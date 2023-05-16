package com.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class MovieShowTimeDTO {
    private LocalDate showDate;
    private Integer movieId;
    private LocalTime[] listTime;


    public MovieShowTimeDTO() {
    }

    public MovieShowTimeDTO(LocalDate showDate, Integer movieId, LocalTime[] listTime) {
        this.showDate = showDate;
        this.movieId = movieId;
        this.listTime = listTime;
    }

    public LocalDate getShowDate() {
        return showDate;
    }

    public void setShowDate(LocalDate showDate) {
        this.showDate = showDate;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public LocalTime[] getListTime() {
        return listTime;
    }

    public void setListTime(LocalTime[] listTime) {
        this.listTime = listTime;
    }
}
