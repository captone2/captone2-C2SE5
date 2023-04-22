package com.model.dto;

import java.time.LocalTime;

//TuHC
public interface SeatDTO {
    long getId();

    int getVip();

    String getName();

    double getPrice();

    double getBasePrice();

    String getTitle();

    LocalTime getShowtime();
}
