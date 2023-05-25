package com.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class MovieShowTimeDTO {
    private Integer movieId;
    private String showDate;
    private Integer screenId;
    private Integer[] showTime;

    public MovieShowTimeDTO() {
    }

    public MovieShowTimeDTO(Integer movieId, String showDate, Integer[] showTime) {
        this.movieId = movieId;
        this.showDate = showDate;
        this.showTime = showTime;
    }

    public Integer getScreenId() {
        return screenId;
    }

    public void setScreenId(Integer screenId) {
        this.screenId = screenId;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public Integer[] getShowTime() {
        return showTime;
    }

    public void setShowTime(Integer[] showTime) {
        this.showTime = showTime;
    }
}
