package com.model.dto.hue;

import java.time.LocalTime;

public class ShowTimesDTO {
    private long id;

    private LocalTime showtime;
    private long price;

    private long movie_id;

    public ShowTimesDTO(LocalTime showtime, long price) {
        this.showtime = showtime;
        this.price = price;
    }

    public long getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(long movie_id) {
        this.movie_id = movie_id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalTime getShowtime() {
        return showtime;
    }

    public void setShowtime(LocalTime showtime) {
        this.showtime = showtime;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }
}
